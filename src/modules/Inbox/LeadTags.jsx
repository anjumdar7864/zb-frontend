import { When } from 'react-if';
import { size } from "lodash-es";

const DEFAULT_DISPLAY_TAGS = 1;

const LeadTags = ({ tags }) => {
  const totalTags = size(tags);

  return (
    <>
      {tags?.map((tag, i) => {
        return (i < DEFAULT_DISPLAY_TAGS) && <div className="tag" style={{ "--color": tag.color }} key={tag._id}>
          <span style={{color:"white"}}>{tag.name}</span>
        </div>
        }
      )}
      <When condition={totalTags > DEFAULT_DISPLAY_TAGS}>
        <div className="tag" style={{ "--color": "#efefef" }}>
          <span>+{totalTags- DEFAULT_DISPLAY_TAGS}</span>
        </div>
      </When>
    </>
  );
};

export default LeadTags;