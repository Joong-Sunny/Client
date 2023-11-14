import { ChangeEvent, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

export default function CustomNode({ id, data }) {
  console.log('data 봐랑!!', data);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

  return (
    <>
      <Wrapper>
        <Header>
          <span>{data.name}</span>
        </Header>

        {Object.entries(data.inputSockets).map(([key, socket]) => {
          return (
            <Body>
              <Handle
                key={socket.uuid}
                type="target"
                position={Position.Left}
                id={socket.uuid}
              />
              <input
                id={'number'}
                type={'number'}
                onChange={onChange}
                className={'nodrag'}
              />
              <label htmlFor={'number'}>{socket.key}</label>
            </Body>
          );
        })}
        {Object.entries(data.outputSockets).map(([key, socket]) => (
          <Body>
            <Handle
              key={socket.uuid}
              type="source"
              position={Position.Right}
              id={socket.uuid}
            />
            <input
              id={'number'}
              type={'number'}
              onChange={onChange}
              className={'nodrag'}
            />
            <label htmlFor={'number'}>{socket.key}</label>
          </Body>
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #272749;
  color: white;
  padding: 4px 12px;
  border-radius: 10px 10px 0 0;
`;

const Body = styled.div`
  position: relative;
  background-color: #393939;
  padding: 14px 18px;
  border-radius: 0 0 10px 10px;

  & > label {
    color: white;
    margin-left: 20px;
  }

  & > input {
    background-color: #282828;
    outline: none;
    border: none;
    padding: 4px;
    color: white;
  }
`;

{
  /*/!* input 예시 *!/*/
}
{
  /*<input*/
}
{
  /*  id={'number'}*/
}
{
  /*  type={'number'}*/
}
{
  /*  onChange={onChange}*/
}
{
  /*  className={'nodrag'}*/
}
{
  /*/>*/
}
{
  /*<Wrapper>*/
}
{
  /*  <Header>*/
}
{
  /*    <span>{data.name}</span>*/
}
{
  /*  </Header>*/
}
{
  /*  <Body>*/
}
{
  /*    <Handle type={'source'} position={Position.Right} id={id} />*/
}
{
  /*    <input*/
}
{
  /*      id={'number'}*/
}
{
  /*      type={'number'}*/
}
{
  /*      onChange={onChange}*/
}
{
  /*      className={'nodrag'}*/
}
{
  /*    />*/
}
{
  /*    <label htmlFor={'number'}>넘버</label>*/
}
{
  /*  </Body>*/
}
{
  /*</Wrapper>*/
}
