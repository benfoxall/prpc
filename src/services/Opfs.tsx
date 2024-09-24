import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { OpfsService } from "../lib/protos/generated/opfs_pb_service";
import { FileEntry } from "../lib/protos/generated/opfs_pb";

const Client: FunctionComponent = () => {
  const client = useContext(ClientContext);
  const service = useMemo(() => client.getServiceStream(OpfsService), [client]);

  const [filelist, setFilelist] = useState<FileEntry[]>([]);

  async function ls() {
    setFilelist([]);
    for await (const file of service("List")) {
      setFilelist((r) => r.concat(file));
    }
  }

  async function download(entry: FileEntry) {
    const res = service("Fetch", (req) => {
      req.setFilename(entry.getFilename());
    });

    const u8s: Uint8Array[] = [];
    for await (const fileList of res) {
      const u8 = fileList.getContent_asU8();
      u8s.push(u8);
    }

    const blob = new Blob(u8s, { type: entry.getType() });
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  useEffect(() => {
    ls();
  }, []);

  return (
    <div className="Opfs">
      <h1>Remote Access</h1>
      <button onClick={ls}> refresh </button>
      <table>
        <tbody>
          {filelist.map((entry) => (
            <tr key={entry.getFilename()}>
              <td>{entry.getFilename()}</td>
              <td>{entry.getType()}</td>
              <td>{formatBytes(entry.getSize())}</td>
              <td>
                <button onClick={() => download(entry)}>download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);

  const { files, deleteFile, getFileBlob, addFile } = useLocalFiles();
  const fref = useRef(files);
  fref.current = files;

  useEffect(() => {
    if (!server) return;

    server.addService(OpfsService, {
      async *List(_request, response) {
        for (const f of fref.current) {
          const entry = new FileEntry();
          entry.setFilename(f.name);
          entry.setSize(f.size);
          entry.setModified(f.modified);
          entry.setType(f.type);
          yield entry;
        }
      },

      async *Fetch(request, response, meta) {
        const blob = await getFileBlob(request.getFilename());

        const bytes = new Uint8Array(await blob.arrayBuffer());

        const conn = server.base.peers.get(meta.peerId);

        let i = 0;
        for (const u8 of chunks(bytes, 15 * 1024)) {
          console.log(
            `sending ${request.getFilename()} to ${meta.peerId} ${i++}`
          );

          response.setContent(u8);
          yield response;

          const MAX_BUFFERED_AMOUNT = 64 * 1024;
          if (conn) {
            while (conn.bufferSize > MAX_BUFFERED_AMOUNT) {
              await new Promise((e) => setTimeout(e, 10));
            }
          }
        }
      },
    });

    return () => server.removeService(OpfsService);
  }, [server]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files; // FileList
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        await addFile(file);
      }
    }
  };
  const openFile = async (fileName: string) => {
    try {
      const blob = await getFileBlob(fileName);
      const url = URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error(`Failed to open file ${fileName}:`, error);
    }
  };

  return (
    <div className="Opfs">
      <h1>File Server</h1>
      <input type="file" onChange={handleFileSelect} multiple />
      <table>
        <tbody>
          {files.map((entry) => (
            <tr key={entry.name}>
              <td>{entry.name}</td>
              <td>{entry.type}</td>
              <td>{formatBytes(entry.size)}</td>
              <td>
                <button onClick={() => openFile(entry.name)}>Open</button>
                <button onClick={() => deleteFile(entry.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Opfs = { Server, Client };

/// Thank you, o1 🫶

interface LocalFileI {
  name: string;
  size: number;
  modified: number;
  type: string;
  handle: FileSystemFileHandle;
}

function useLocalFiles() {
  const [files, setFiles] = useState<LocalFileI[]>([]);

  const loadFiles = async () => {
    const root = await navigator.storage.getDirectory();
    const entries: LocalFileI[] = [];
    for await (const [name, handle] of root.entries()) {
      if (handle.kind === "file") {
        const file = await (handle as FileSystemFileHandle).getFile();
        entries.push({
          name,
          size: file.size,
          modified: file.lastModified,
          type: file.type,
          handle: handle as FileSystemFileHandle,
        });
      }
    }
    setFiles(entries);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const addFile = async (file: File) => {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(file.name, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(file);
    await writable.close();

    await loadFiles(); // Refresh the file list
  };

  const deleteFile = async (fileName: string) => {
    const root = await navigator.storage.getDirectory();
    try {
      await root.removeEntry(fileName);
      await loadFiles(); // Refresh the file list
    } catch (error) {
      console.error(`Failed to delete ${fileName}:`, error);
    }
  };

  const getFileBlob = async (fileName: string): Promise<Blob> => {
    const root = await navigator.storage.getDirectory();
    try {
      const fileHandle = await root.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      return file;
    } catch (error) {
      console.error(`Failed to get file ${fileName}:`, error);
      throw error;
    }
  };

  return { files, addFile, deleteFile, getFileBlob };
}

function* chunks(array: Uint8Array, chunkSize: number) {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}

function formatBytes(bytes: number): string {
  const units = ["b", "kb", "mb", "gb", "tb"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
  return `${value} ${units[i]}`;
}
