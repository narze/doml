export type RawNode =
  | NodeName
  | {
      name: NodeName
      n: NodeName
      children?: RawNode | RawNode[]
      c?: RawNode | RawNode[]
    }
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
        return { name: n.name ?? n.n, children: normalize(n.children ?? n.c) }
      }
    })
    .filter((n) => n)

  return nodes
}
