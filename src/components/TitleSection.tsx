import Select from 'react-select';
import { TitleDetails } from '../common/types';
import { MODEL_OPTIONS } from '../common/constants';

const TitleSection: React.FC<TitleDetails> = ({ title, model, setModel }) => {
  return (
    <div className="d-flex title-container">
      <h2>{title}</h2>
      <label className="inline-label">
        AI Model:{' '}
        <Select
          options={MODEL_OPTIONS}
          className="inline-select"
          value={model}
          onChange={(e) => setModel(e)}
        />
      </label>
    </div>
  );
};

export default TitleSection;
