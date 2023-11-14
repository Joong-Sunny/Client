import { Node } from 'reactflow';
import CustomNode from '@/react-flow/CustomNode.tsx';
import randomNodeData from '@/react-flow/randomNode.json';

interface CustomNodeData {
  name: string;
  uuid: string;
  type: string;
  position: number[];
  inputSockets: {
    [key: string]: {
      key: string;
      uuid: string;
      type: string;
      name: string;
      wires: any[];
      node: string;
      isInput: boolean;
      reference: any | null;
    };
  };
  outputSockets: {
    [key: string]: {
      key: string;
      uuid: string;
      type: string;
      name: string;
      wires: any[];
      node: string;
      isInput: boolean;
      reference: any | null;
    };
  };
  control: any;
  referenceParameter: any;
}

const firstSheetKey = Object.keys(
  randomNodeData.sheets
)[0] as keyof typeof randomNodeData.sheets;
const firstSheet = randomNodeData.sheets[firstSheetKey];
const legacyNodes = firstSheet.nodes; //우리가 원하는 nodes
console.log(legacyNodes);

const transformNodesToReactFlowFormat = (originalNodes: CustomNodeData[]) => {
  const reactFlowNodes = originalNodes.map((node: CustomNodeData) => {
    return {
      id: node.uuid,
      // type: node.type.toLowerCase(), // 예: 'random' 또는 'constantNumber'
      type: 'custom',
      data: {
        name: node.name,
        inputSockets: node.inputSockets,
        outputSockets: node.outputSockets,
        ...node.control,
        ...node.referenceParameter
      },
      position: {
        x: node.position[0],
        y: node.position[1]
      },
      selectable: true
    };
  });

  // 엣지 변환 로직 추가 (예시 코드에서는 생략)

  return reactFlowNodes;
};

export const nodeTypes = { custom: CustomNode };

export const initialNodes: Node[] =
  transformNodesToReactFlowFormat(legacyNodes);

console.log('initialNodes: ', initialNodes);

//   [
//   {
//     id: '1',
//     type: 'constantNumber',
//     data: {},
//     position: { x: 150, y: 250 },
//     selectable: true
//   },
//   {
//     id: '2',
//     type: 'constantNumber',
//     data: {},
//     position: { x: 450, y: 250 },
//     selectable: true
//   }
// ];
