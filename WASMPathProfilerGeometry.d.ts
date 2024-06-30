// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */
    function ccall(ident: any, returnType?: string, argTypes?: any[], args?: any, opts?: any): any;
    /**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
    function cwrap(ident: any, returnType?: string, argTypes?: any[], opts?: any): any;
    let HEAPF32: any;
    let HEAPF64: any;
    let HEAP_DATA_VIEW: any;
    let HEAP8: any;
    let HEAPU8: any;
    let HEAP16: any;
    let HEAPU16: any;
    let HEAP32: any;
    let HEAPU32: any;
    let HEAP64: any;
    let HEAPU64: any;
}
interface WasmModule {
}

export interface VectorFloat {
  size(): number;
  get(_0: number): number | undefined;
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  set(_0: number, _1: number): boolean;
  delete(): void;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
  add(_0: Vector3): Vector3;
  subtract(_0: Vector3): Vector3;
  cross(_0: Vector3): Vector3;
  multiply(_0: number): Vector3;
  dot(_0: Vector3): number;
  angle(_0: Vector3): number;
  length(): number;
  delete(): void;
}

export interface Matrix4 {
  getElements(): VectorFloat;
  setElements(_0: VectorFloat): void;
  delete(): void;
}

export interface WASMPathProfiler {
  createProfile(_0: any, _1: any, _2: boolean): any;
  delete(): void;
}

interface EmbindModule {
  VectorFloat: {new(): VectorFloat};
  Vector3: {new(): Vector3; new(_0: number, _1: number, _2: number): Vector3};
  Matrix4: {new(): Matrix4; Translation(_0: Vector3): Matrix4};
  WASMPathProfiler: {new(): WASMPathProfiler};
}

export type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
