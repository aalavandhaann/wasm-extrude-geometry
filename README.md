# wasm-extrude-geometry
This is a library written using webassembly for creating extrude geometry using threejs (possibly babylonjs too). The included files are 
- WASM compiled javascript file that contains the implementation of extrudegeometry
- A type definition file to use in your typescript projects
- A ts wrapper file that will be used in your projects. Feel free to add a js version of the file if possible

# Highlights about this library
- The extrude geometry offers more control in extruding any shape you want along a 3D path
- Importantly the UV is well defined, so the geometries can be applied with a texture
- Written using C++ and compiled to webassembly, hence should be faster than usual
- Low polygon count

## Note 
Since this works based on WASM it comes as an async function. So you might have to use await in your implementation when calling the wrapper class.

# Example code

```
import {Vector2, Vector3, BufferGeometry } from 'three';
import { WASMPathProfilerWrapper } from "<from the right location>/WASMExtrudeGeometry";

// Define room dimensions
const roomWidth: number = 5.0;  // meters
const roomDepth: number = 5.0;  // meters

const shapePoints: Vector2 = [
    new Vector2(0, 0, 0),
    new Vector2(0.5, 0, 0),
    new Vector2(0.5, 0.5, 0),
    new Vector2(0, 0.5, 0),
    new Vector2(0, 0, 0),
];

const roomCornerPoints = [
    new Vector3(0, 0, 0),
    new Vector3(roomWidth, 0, 0),
    new Vector3(roomWidth, 0, roomDepth-2),
    new Vector3(roomWidth-2, 0, roomDepth-2),
    new Vector3(roomWidth-2, 0, roomDepth),  
    new Vector3(0, 0, roomDepth),
];

async function createExtrudeGeometry(): Promise<BufferGeometry>:
{
  const result: {
              vertices: Float32Array, 
              positions: Float32Array,
              uv: Float32Array,
              vertexUVS: Float32Array,
              indices: number[]
          } = await this._wasmProfilePath.createPathProfileGeometry(shapePoints, pathPoints, true);
  const geometry: BufferGeometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute (result.positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(result.uv, 2));
  geometry.computeVertexNormals();// Important if you want to render your geometry at all
  geometry.computeBoundingBox();//For size related analysis
  geometry.computeBoundingSphere();//For physics purposes
  return geometry;
}
```

# Screenshots

The 2D design for extrusion along a path: 

<image src="images/A121.jpg" alt="A121.jpg">

Extruded with solid colors

<image src="images/WithoutTextures.png" alt="WithoutTextures">

Extruded with PBR textures

<image src="images/WithTextures.png" alt="WithTextures">
