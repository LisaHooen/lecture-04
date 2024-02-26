import { Map, View } from "ol";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import { useGeographic } from "ol/proj";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { OSM } from "ol/source";

useGeographic();

const map = new Map({
  view: new View({ center: [10, 59], zoom: 8 }),
});

const MapApplication = () => {
  const handleFocusUser = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 8,
      });
    });
  };

  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  useEffect(() => map.setLayers(layers), [layers]);
  return (
    <>
      <header>
        <h1>hei</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
      </nav>
      <div ref={mapRef}>
        <h1></h1>
      </div>
    </>
  );
};
export default MapApplication;
