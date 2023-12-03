import { Metadata } from "next";
export const metadata: Metadata = {
  title: "提交成功",
  description: "提交问卷成功",
};
export default function Success() {
  return (
    <div style={{textAlign:"center"}}>
      <h1>成功</h1>
      <p>问卷提交成功</p>
    </div>
  );
}
