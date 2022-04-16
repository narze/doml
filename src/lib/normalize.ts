export type RawNode =
  | NodeName
  | { name: NodeName; children?: RawNode | RawNode[] }
export type NormalizedNode = { name: NodeName; children?: NormalizedNode[] }
export type NodeName = string | number

export function normalize(node: RawNode | RawNode[]): NormalizedNode[] {
  const rawNodes = Array.isArray(node) ? node : [node]

  const nodes = rawNodes
    .map((n) => {
      if (!n) {
        return null
      } else if (typeof n === "string" || typeof n === "number") {
        return { name: `${n}` }
      } else {
        return { name: n.name, children: normalize(n.children) }
      }
    })
    .filter((n) => n)

  return nodes
}
