import { Feature, Map, MapBrowserEvent } from "ol";
import { Polygon } from "ol/geom";
import Layer from "ol/layer/Layer";
import VectorSource from "ol/source/Vector";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GeoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";

type KommuneProperties = {
  kommunenummer: string;
};

type KommuneFeature = Feature<Polygon> & {
  getProperties(): KommuneProperties;
};

const kommuneSource = new VectorSource<KommuneFeature>({
  url: "lecture-04/public/kommuner.JSON",
  format: new GeoJSON(),
});

const kommuneLayer = new VectorLayer({
  source: kommuneSource,
});

const KommuneLayerCheckbox = ({
  map,
  setLayers,
}: {
  map: Map;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
}) => {
  const [checked, setChecked] = useState(false);
  const handleClick = (e: MapBrowserEvent<MouseEvent>) => {
    const clickedKommune = kommuneSource
      .getFeaturesAtCoordinate(e.coordinate)
      .map((f) => f.getProperties());
    alert(JSON.stringify(clickedKommune![0].kommunenummer));
  };
  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommuneLayer]);
      map.on("click", handleClick);
    }
    return () => {
      map.un("click", handleClick);
      setLayers((old) => old.filter((l) => l !== kommuneLayer));
    };
  }, [checked]);

  return (
    <>
      <div>
        <label>
          <input
            type={"checkbox"}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          {checked ? "Hide " : "Show "}Kommune layer
        </label>
      </div>
    </>
  );
};

export default KommuneLayerCheckbox;
