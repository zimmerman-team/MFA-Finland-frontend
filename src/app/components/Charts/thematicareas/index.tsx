/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import find from "lodash/find";
import Grid from "@material-ui/core/Grid";
import {
  directions,
  DataProps,
  ThematicAreasProps,
} from "app/components/Charts/thematicareas/data";
import {
  containercss,
  itemcirclecss,
  singleitemcss,
  singleitemcontainercss,
} from "app/components/Charts/thematicareas/styles";
import { IconClose } from "app/assets/icons/IconClose";

export function ThematicAreas(props: ThematicAreasProps) {
  const [selected, setSelected] = React.useState<DataProps | null>(null);

  function onSelect(v: DataProps | null) {
    setSelected(v);
    props.setSelectedVizItem(v ? v.name : null);
  }

  React.useEffect(() => {
    if (props.selectedVizItemId) {
      const fItem = find(props.data, { name: props.selectedVizItemId });
      if (fItem) {
        setSelected(fItem as DataProps);
      }
    } else {
      setSelected(null);
    }
  }, [props.selectedVizItemId]);

  return (
    <Grid container justify="center">
      {selected ? (
        <div css={singleitemcontainercss}>
          <IconClose onClick={() => onSelect(null)} />
          <div
            css={`
              ${containercss}
              background: transparent;
            `}
          >
            <div
              css={singleitemcss(
                selected.color,
                directions[0],
                selected.values
              )}
            >
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          <span>{selected.name}</span>
        </div>
      ) : (
        <div css={containercss}>
          {props.data.map((item: DataProps, index: number) => (
            <div css={itemcirclecss(item.size, item.color, directions[index])}>
              <div />
              <div />
              <div />
              <div />
              <div onClick={() => onSelect(item)}>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Grid>
  );
}
