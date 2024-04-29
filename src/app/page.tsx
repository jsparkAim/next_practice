//import { signOut } from "../auth"

export default async function Home() {
  return (
    <div>
      <h1>홈 페이지</h1>
      <h2>인증 없이 못보는 화면</h2>
      <form
          // action={async () => {
    	    // 추후에 추가될 로그아웃 메소드
          // 'use server';
          //  await signOut();
          // }}
        >
          {/* <button>
            로그아웃
          </button> */}
        </form>
    </div>
  )
}