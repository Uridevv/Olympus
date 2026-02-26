import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function ProductModel() {
  // Carga tu modelo GLB
  const { scene } = useGLTF('/models/sample.glb');

  // Puedes ajustar la posición, escala, etc., si es necesario
  // Por ejemplo, para escalar: scene.scale.set(0.1, 0.1, 0.1);

  return <primitive object={scene} />;
}

export function Product3DModel() {
  return (
    <div style={{ width: '100%', height: '500px' }}> {/* Asegúrate de darle dimensiones al contenedor */}
      <Canvas>
        <ambientLight intensity={0.5} /> {/* Luz ambiental */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> {/* Luz direccional */}
        <pointLight position={[-10, -10, -10]} /> {/* Otra luz para mejor iluminación */}
        <ProductModel/>
        <OrbitControls enableZoom enablePan /> {/* Permite al usuario rotar y hacer zoom */}
      </Canvas>
    </div>
  );
}