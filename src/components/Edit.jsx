import React, { useEffect } from 'react';
import './Edit.css';

const EditSeminarForm = ({ seminar, onSave, onClose, onChange }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(seminar.id, seminar);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <svg className="modal-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Редактировать Семинар
          </div>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Название</label>
              <input
                type="text"
                id="title"
                name="title"
                value={seminar.title}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <textarea
                id="description"
                name="description"
                value={seminar.description}
                onChange={onChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Дата</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={seminar.date}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Время</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={seminar.time}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="photo">Фото URL</label>
              <input
                type="text"
                id="photo"
                name="photo"
                value={seminar.photo}
                onChange={onChange}
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="button cancel-button">
            Отменить
          </button>
          <button onClick={handleSubmit} className="button save-button">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSeminarForm;