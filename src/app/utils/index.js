export function mergeMeshes (meshes) {
  var combined = new THREE.Geometry();
  for (var i = 0; i < meshes.length; i++) {
    meshes[i].updateMatrix();
    combined.merge(meshes[i].geometry, meshes[i].matrix);
  }
  return combined;
}


export function collisonXYZ(o1, o2) {
  if (Math.abs(o1.position.x - o2.position.x) > (o1.geometry.parameters.width + o2.geometry.parameters.width) / 2)
    return false;
  if (Math.abs(o1.position.y - o2.position.y) > (o1.geometry.parameters.height + o2.geometry.parameters.height) / 2)
    return false;
  if (Math.abs(o1.position.z - o2.position.z) > (o1.geometry.parameters.depth + o2.geometry.parameters.depth) / 2)
    return false;
  return true;
}
