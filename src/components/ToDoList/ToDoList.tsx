import { ChangeEvent, useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Container, Item, StyledSpan, StyledButton, InlineEditContainer, StyledImage } from './styles';
import { ToDoListProps } from './types';
import { StyledInput } from './styles';
import { Todo, TodoStatus } from '../../types/types';
import { INPUT_PLACEHOLDER } from '../ToDoCreation/constants';
import { KeyboardKeys } from '../types';
import { isValid } from '../../utils/validateEntry';
import NoRecordFound from '../../assets/images/no-record-found.png';

const ToDoList = ({
  todos,
  showEditField,
  selectedTodoId,
  onUpdateTodoStatus,
  onDeleteToDo,
  onEditTodo,
  onHandleShowInlineEdit
}: ToDoListProps) => {
  const [fieldValue, setFieldValue] = useState('');
  const inlineEditRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inlineEditRef.current) inlineEditRef.current.focus();
  });

  const handleUpdateToDoStatus = (idx: string) => (e: ChangeEvent<HTMLInputElement>) => onUpdateTodoStatus(e, idx);

  const handleDelete = (toDoId: string) => () => onDeleteToDo(toDoId);

  const handleDoubleClick = (todoId: string, todoStatus: string) => () => todoStatus !== TodoStatus.COMPLETED && onHandleShowInlineEdit(true, todoId);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value);

  const handleEditContent = (todo: Todo) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeyboardKeys.ENTER && fieldValue && isValid(todos, fieldValue)) {
      onEditTodo(e, todo.id as string, fieldValue);
      onHandleShowInlineEdit(false, '');
    }
  };

  return (
    <Container>
      {
        todos.length ? todos.map(( todo, index ) => {
          return (
            <Item key={index}>
              <StyledInput
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={handleUpdateToDoStatus(todo.id as string)}
              />
              {
                showEditField && todo.id === selectedTodoId ? (
                  <InlineEditContainer>
                    <StyledInput
                      ref={inlineEditRef}
                      data-id={todo.id}
                      defaultValue={todo.content as string}
                      placeholder={INPUT_PLACEHOLDER}
                      onKeyDown={handleEditContent(todo)}
                      onChange={handleOnChange}
                    />
                  </InlineEditContainer>
                ): (
                  <StyledSpan
                    className={todo.status === TodoStatus.COMPLETED ? 'completed' : ''}
                    onDoubleClick={handleDoubleClick(todo.id as string, todo.status as string)}
                  >
                    {todo.content as string}
                  </StyledSpan>
                )
              }
              <StyledButton onClick={handleDelete(todo.id as string)}>X</StyledButton>
            </Item>
          );
        }) : <StyledImage src={NoRecordFound} />
      }
    </Container>
  );
};

export default ToDoList;
