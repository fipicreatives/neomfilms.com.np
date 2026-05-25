/**
 * Parses CMS about description blocks that use [title] and [list] line prefixes.
 * Blocks are split on double newlines (\r\n\r\n) before calling parseContentBlock.
 */

export function parseContentBlock(block) {
  const lines = block.split(/\r\n|\n/).map((l) => l.trim()).filter(Boolean);
  const segments = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      segments.push({ type: "list", items: [...listItems] });
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("[title]")) {
      flushList();
      segments.push({ type: "title", text: line.slice(7).trim() });
    } else if (line.startsWith("[list]")) {
      listItems.push(line.slice(6).trim());
    } else {
      flushList();
      segments.push({ type: "paragraph", text: line });
    }
  }

  flushList();
  return segments;
}

export function parseRestDescriptionBlocks(blocks) {
  return blocks.flatMap((block) => parseContentBlock(block));
}
