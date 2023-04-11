import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Todo.style';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [listContent, setListContent] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editContent, setEditContent] = useState('');
  const navigate = useNavigate();

  const handleTodo = e => {
    setListContent(e.target.value);
  };

  const handleUpload = () => {
    setTodoList(prevlist => {
      return [...prevlist, listContent];
    });
    setListContent('');
  };

  const handleEdit = index => {
    setEditIndex(index);
    setEditContent(todoList[index]);
  };

  const handleSave = index => {
    setTodoList(prevlist => {
      prevlist[index] = editContent;
      return prevlist;
    });
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setEditIndex(-1);
  };

  const handleEditContent = e => {
    setEditContent(e.target.value);
  };

  const handleDelete = index => {
    setTodoList(prevList => prevList.filter((_, i) => i !== index));
    alert('삭제되었습니다.');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    fetch('https://www.pre-onboarding-selection-task.shop/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todo: 'listContent',
      }),
    }).then(response => {
      if (response.status === 201) {
        console.log('응답', response);
      }
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        data-testid="new-todo-input"
        value={listContent}
        onChange={handleTodo}
      />
      <button data-testid="new-todo-add-button" onClick={handleUpload}>
        추가
      </button>
      <ul>
        {todoList.map((content, index) => {
          const isEditing = index === editIndex;
          return (
            <li key={index}>
              <label>
                <input type="checkbox" />
                {isEditing ? (
                  <input
                    type="text"
                    data-testid="modify-input"
                    value={editContent}
                    onChange={handleEditContent}
                  />
                ) : (
                  <span>{content}</span>
                )}
              </label>
              {isEditing ? (
                <>
                  <button
                    data-testid="submit-button"
                    onClick={() => handleSave(index)}
                  >
                    제출
                  </button>
                  <button data-testid="cancel-button" onClick={handleCancel}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <button
                    data-testid="modify-button"
                    onClick={() => handleEdit(index)}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    data-testid="delete-button"
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
