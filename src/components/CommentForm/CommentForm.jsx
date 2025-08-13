import { useState } from 'react';

const CommentForm = (props) => {
  const initialState = { content: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ content: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.07)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
        color: 'white',
        margin: '0 auto'
      }}
    >
      <label
        htmlFor="content"
        style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}
      >
        Add a comment
      </label>
      <textarea
        id="content"
        name="content"
        rows={3}
        placeholder="Write your comment…"
        value={formData.content}
        onChange={handleChange}
        required
        style={{
          padding: '12px',
          fontSize: '1rem',
          borderRadius: '12px',
          border: '2px solid rgba(255,255,255,0.3)',
          background: 'rgba(255, 255, 255, 0.07)',
          color: 'white',
          resize: 'vertical',
          minHeight: 'auto',
        }}
      />

      <button
        type="submit"
        style={{
          padding: '12px',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '12px',
          border: '2px solid rgba(255,255,255,0.3)',
          background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.opacity = 0.9;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.opacity = 1;
        }}
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
