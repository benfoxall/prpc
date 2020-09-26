import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ServerContext } from "../Host";
import { ClientContext } from "../Join";
import { GeolocationCoordinates } from "../lib/protos/generated/gps_pb";
import { GPS } from "../lib/protos/generated/gps_pb_service";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmVuamFtaW5iZW5iZW4iLCJhIjoiT3I1N1hMUSJ9.69a8Y_2A8x122liNhTQe-Q";

const Client: FunctionComponent = () => {
  const client = useContext(ClientContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const service = client.getService(GPS);

    var map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 12,
    });

    var marker = new mapboxgl.Marker().setLngLat([30.5, 50.5]).addTo(map);

    let stop = false;

    (async () => {
      while (true) {
        const result = await service("query");

        if (stop) return;

        const lngLat = [result.getLongitude(), result.getLatitude()];

        marker.setLngLat(lngLat);

        map.setCenter(lngLat);

        await new Promise((res) => setTimeout(res, 500));
      }
    })();

    return () => {
      stop = true;
      map.remove();
    };
  }, []);

  return (
    <div>
      <div style={{ height: "70vh" }} ref={ref}></div>
    </div>
  );
};

const Server: FunctionComponent = () => {
  const server = useContext(ServerContext);

  useEffect(() => {
    if (!server) return;

    let position: Position;

    const watchID = navigator.geolocation.watchPosition((result) => {
      position = result;
    });

    server.addService(GPS, {
      query(req, res) {
        if (position) {
          res.setLatitude(position.coords.latitude);
          res.setLongitude(position.coords.longitude);
          res.setSpeed(position.coords.speed);
          res.setHeading(position.coords.heading);
          // todo
        }
      },
    });

    return () => {
      server.removeService(GPS);
      navigator.geolocation.clearWatch(watchID);
    };
  }, [server]);

  return <div>Recording</div>;
};

export const Gps = { Server, Client };
