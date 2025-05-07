import { useEffect, useState } from 'react';
import { getInfo } from '../api';
import { DocDetails, OptionType } from '../common/types';

interface CollapsiblePanelProps {
  id: string; // The URL or path of the PDF file
  model: OptionType | null;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ id, model }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<DocDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const togglePanel = () => setIsOpen(false);

  const extractInformation = async () => {
    setLoading(true);
    const response = await getInfo({
      id,
      is_qna: false,
      question: '',
      model_name: model?.value || 'rls',
    });

    if (response.result?.answer) {
      setDetails(response.result.answer);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (id) {
        extractInformation();
      }
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className={`sidebar-panel ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="panel-title" onClick={togglePanel}>
        AI Extracted Information
      </div>

      {isOpen && (
        <div className="panel-content">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <form className="attributes-form">
              <div className="form-group">
                <label htmlFor="title">Contract Title:</label>
                <div>{details?.contract_title || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="type">Contract Type:</label>
                <div>{details?.contract_type || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <div>{details?.contract_start_date || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <div>{details?.contract_end_date || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Contract Amount:</label>
                <div>{details?.contract_amount || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="naisc_code">NAISC Code:</label>
                <div>{details?.contract_naisc_code || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="eligibility_criteria">
                  Eligibility Criteria:
                </label>
                <div>{details?.contract_eligibility_criteria || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="scope">Scope:</label>
                <div>{details?.contract_scope || '-'}</div>
              </div>
              <div className="form-group">
                <label htmlFor="procedure">Procedure for bidding:</label>
                <div>{details?.contract_processing_for_biding || '-'}</div>
              </div>
            </form>
          )}
        </div>
      )}
    </aside>
  );
};

export default CollapsiblePanel;
