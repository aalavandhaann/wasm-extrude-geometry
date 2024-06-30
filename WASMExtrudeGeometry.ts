import type { Vector3 } from "three";
import MainModuleFactory, { MainModule, Vector3 as WASMVector3 } from "./WASMPathProfilerGeometry";

export class WASMExtrudeGeometry{    
    constructor(){
    }

    async createPathProfileGeometry(
        profileShapePoints2D: Vector2[],
        path3D: Vector3[], 
        isClosedPath: boolean = true): Promise<{
            vertices: Float32Array, 
            positions: Float32Array,
            uv: Float32Array,
            vertexUVS: Float32Array,
            indices: number[]
        }>{
        
        function getVector2AsWASMVector3Array(threeVectors: Vector2[]): WASMVector3 []{
            return threeVectors.map((v: Vector2) => new module.Vector3(v.x, v.y, 0));    
        }
        function getAsWASMVector3Array(threeVectors: Vector3[]): WASMVector3 []{
            return threeVectors.map((v: Vector3) => new module.Vector3(v.x, v.y, v.z));    
        }
        const module: MainModule = await MainModuleFactory ();
        const wasmPath3D: WASMVector3 [] = getAsWASMVector3Array(path3D);
        const wasmProfileShapePoints2D: WASMVector3 [] = getVector2AsWASMVector3Array(profileShapePoints2D);
        const pathProfiler = new module.WASMPathProfiler();
        const profile: {
            vertices: Float32Array, 
            positions: Float32Array,
            uv: Float32Array,
            vertexUVS: Float32Array,
            indices: number[]

        } = pathProfiler.createProfile(wasmProfileShapePoints2D, wasmPath3D, isClosedPath);
        wasmProfileShapePoints2D.forEach((v: WASMVector3) => v.delete());
        wasmPath3D.forEach((v: WASMVector3) => v.delete());
        pathProfiler.delete();
        return {vertices: profile.vertices, positions: profile.positions, uv: profile.uv, vertexUVS: profile.vertexUVS, indices: profile.indices};
    }
}
