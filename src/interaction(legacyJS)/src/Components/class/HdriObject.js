import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { RGBELoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

export default function Env({
  background,
  intensity = 1,
  blur = 0,
  x = 0,
  y = 0,
  z = 0,
  file,
}) {
  const fileName = file ? file : "./hdri/MX_stu_hdri_Studio_02.hdr";
  const texture = useLoader(RGBELoader, fileName);
  texture.encoding = THREE.sRGBEncoding;

  return (
    <Environment background={background} blur={blur}>
      <color attach="background" args={["black"]} />
      <mesh rotation={[x, y, z]} scale={100}>
        <sphereGeometry />
        <meshBasicMaterial
          transparent
          opacity={intensity}
          map={texture}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>
    </Environment>
  );
}
