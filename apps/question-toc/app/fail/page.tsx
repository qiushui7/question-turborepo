import {Metadata} from "next";

export const metadata: Metadata = {
  title: "提交失败",
  description: "提交问卷失败",
};
export default function Fail() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>失败</h1>
      <p>问卷提交失败</p>
    </div>
  );
}
