import React, { useEffect, useState } from 'react';
import * as S from './Todo.style';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [listContent, setListContent] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editContent, setEditContent] = useState('');

  const token = localStorage.getItem('token');

  const onChangeTodoContent = e => {
    setListContent(e.target.value);
  };

  //createTodo
  const onClickAdd = () => {
    if (!listContent) {
      alert('내용을 추가해 주세요!');
    } else {
      fetch('https://www.pre-onboarding-selection-task.shop/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          todo: `${listContent}`,
        }),
      })
        .then(response => {
          if (response.status === 201) {
            setTodoList(prevlist => [
              ...prevlist,
              { id: prevlist.length + 1, todo: listContent },
            ]);
            setListContent('');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert(`Error: ${error}`);
        });
    }
  };

  //getTodos
  useEffect(() => {
    fetch('https://www.pre-onboarding-selection-task.shop/todos', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        setTodoList(result);
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Error: ${error}`);
      });
  }, [token]);

  const onClickEdit = (index, id) => {
    setEditIndex(index);
    setEditContent(todoList[index].todo);
  };

  //updateTodo
  const onClickSubmit = (index, id, event) => {
    const { checked } = event.target;

    setTodoList(prevlist => {
      prevlist[index].todo = editContent;
      return prevlist;
    });
    setEditIndex(-1);

    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo: `${listContent}`,
        isCompleted: checked,
        // id: `${listContent.id}`,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          alert(`State Code: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Error: ${error}`);
      });
  };

  const onClickCancel = () => {
    setEditIndex(-1);
  };

  const onChangeContent = e => {
    setEditContent(e.target.value);
  };

  const onClickDelete = index => {
    setTodoList(prevList => prevList.filter((_, i) => i !== index));
    alert('삭제되었습니다.');
  };

  return (
    <div>
      <input
        type="text"
        data-testid="new-todo-input"
        value={listContent}
        onChange={onChangeTodoContent}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onClickAdd();
          }
        }}
      />
      <button data-testid="new-todo-add-button" onClick={onClickAdd}>
        추가
      </button>
      <ul>
        {todoList.length > 0 &&
          todoList.map(({ content, isCompleted, id }, index) => {
            const isEditing = index === editIndex;
            return (
              <li key={id}>
                <label>
                  <input type="checkbox" checked={isCompleted}>
                    이게뭐지?
                  </input>
                  {isEditing ? (
                    <input
                      type="text"
                      data-testid="modify-input"
                      value={editContent}
                      onChange={onChangeContent}
                    />
                  ) : (
                    <span>{content}</span>
                  )}
                </label>
                {isEditing ? (
                  <>
                    <button
                      data-testid="submit-button"
                      onClick={() => onClickSubmit(index)}
                    >
                      제출
                    </button>
                    <button data-testid="cancel-button" onClick={onClickCancel}>
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      data-testid="modify-button"
                      onClick={() => onClickEdit(index)}
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onClickDelete(index)}
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
