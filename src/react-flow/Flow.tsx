import { useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  OnConnect,
  OnNodesChange,
  addEdge,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import initialEdges from './edges.ts';
import { initialNodes, nodeTypes } from './nodes.tsx';

export default function Flow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleChange: OnNodesChange = (changes) => {
    onNodesChange(changes);
    // console.log(nodes[0].position);
    // console.log(nodes[0].positionAbsolute);
  };

  return (
    <div style={{ width: '90vw', height: '90vh', backgroundColor: 'black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        onNodesChange={handleChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}
