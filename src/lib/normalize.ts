export type RawNode =
  | NodeName
  | { name: NodeName; children?: RawNode | RawNode[] }
export type Node = { name: NodeName; children?: Node[] }
export type NodeName = string | number

export function normalize(node: RawNode | RawNode[]): Node[] {
  const rawNodes = Array.isArray(node) ? node : [node]

  const nodes = rawNodes.map((n) => {
    if (typeof n === "string" || typeof n === "number") {
      return { name: `${n}` }
    } else {
      return { name: n.name, children: normalize(n.children) }
    }
  })

  return nodes
}
