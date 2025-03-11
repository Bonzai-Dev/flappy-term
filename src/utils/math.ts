import Vector2 from "@equinor/videx-vector2";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVector(a: Vector2, b: Vector2, t: number): Vector2 {
  return new Vector2(
    lerp(a.x, b.x, t),
    lerp(a.y, b.y, t)
  )
}

export default { lerp, lerpVector };