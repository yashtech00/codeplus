export const LANGUAGE_MAPPING: {
  [key: string]: {
    judge0: number;
    internal: number;
    name: string;
    monaco: string;
  };
} = {
  js: { judge0: 63, internal: 1, name: "javascript", monaco: "Javascript" },
  cpp: { judge0: 54, internal: 2, name: "c++", monaco: "c++" },
  rs: { judge0: 73, internal: 3, name: "Rust", monaco: "c++" },
};
