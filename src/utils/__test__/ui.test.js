import { formatNumberToK, convertCommentsToTree, pluralize } from "../ui";
import commentsFixture, {
  tree,
  treeWithDeletedChildren,
  treeWithSortedChildren,
} from "../../__fixtures__/comments";

describe("formatNumberToK", () => {
  it("Should return number as string if less than 1000", () => {
    expect(formatNumberToK(100)).toBe(`100`);
  });

  it("Should format number without decimal if not floating number", () => {
    expect(formatNumberToK(23000)).toBe(`23k`);
  });

  it("Should format number with 1 fixed decimal if floating", () => {
    expect(formatNumberToK(53400)).toBe(`53.4k`);
  });
});

describe("convertCommentsToTree", () => {
  let comments;

  beforeEach(() => {
    comments = [...commentsFixture];
  });

  it("Should convert an array into tree", () => {
    const { tree: receivedTree, nodeCount } = convertCommentsToTree(comments);
    expect(receivedTree).toEqual(tree);
    expect(nodeCount).toBe(5);
  });

  it("Should ignore child comments if parent comment is deleted when converting to tree", () => {
    //delete second comment in list
    comments.splice(1, 1);
    const { tree: receivedTree, nodeCount } = convertCommentsToTree(comments);
    expect(receivedTree).toEqual(treeWithDeletedChildren);
    expect(nodeCount).toBe(2);
  });

  it("Should respect the sort order when converting to tree", () => {
    comments.sort((a, b) => b.created_utc - a.created_utc);
    const { tree: receivedTree, nodeCount } = convertCommentsToTree(comments);
    expect(receivedTree).toEqual(treeWithSortedChildren);
    expect(nodeCount).toBe(5);
  });
});

describe("pluralize", () => {
  it("Should return singular value when count is 1", () => {
    expect(pluralize(1, "test", "tests")).toBe(`test`);
  });

  it("Should return plural value when count is more than 1", () => {
    expect(pluralize(12, "test", "tests")).toBe(`tests`);
  });
});
