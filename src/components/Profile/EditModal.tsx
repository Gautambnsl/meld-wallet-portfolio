import React, { useState } from 'react';
import { updateProfileApi } from '../../services/profile/updateProfileApi';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateField } from '../../store/slices/userDataSlice';

interface EditModalProps {
  field: string;
  value: string;
  label: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ field, value, label, isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState(value);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const data = { [field]: inputValue };
      const response = await updateProfileApi(data);
      
      if (response) {
        dispatch(updateField({ field, value: inputValue }));
        toast.success(`${label} updated successfully!`);
        setInputValue('')
        onClose();
      }
    } catch (error) {
      toast.error(`Failed to update ${label}. Please try again.`);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit {label}</h2>
          <input
            type="text"
            className="modal-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter new ${label.toLowerCase()}`}
          />
          <div className="modal-actions">
            <button className="save-btn btn-primary" onClick={handleSubmit}>Save</button>
            <button className="cancel-btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
