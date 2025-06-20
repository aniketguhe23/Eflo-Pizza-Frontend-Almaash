import Link from "next/link";

export default function JoinRewardFree() {
  return (
    <div className="bg-[#eeeeee]  py-5 flex justify-between items-center text-2xl font-bold  [font-family:'Barlow_Condensed',Helvetica] px-10">
      <span className="text-black uppercase tracking-wide ">
        JOIN ELFO’S REWARDS UNLOCK FREE
      </span>
      <div className="flex items-center gap-2 md:gap-3">
        <Link href="/pages/auth/createAccount">
          <span className="text-[#f47335]  cursor-pointer">
            CREATE AN ACCOUNT
          </span>
        </Link>
        {/* <Link href="/signup">
          <span className="text-[#f47335]  cursor-pointer">
            CREATE AN ACCOUNT
          </span>
        </Link> */}
        <span className="text-black px-10">OR</span>
        <Link href="/pages/auth/login">
          <span className="text-[#f47335] cursor-pointer">
            SIGN IN
          </span>
        </Link>
        {/* <Link href="/signin">
          <span className="text-[#f47335] cursor-pointer">
            SIGN IN
          </span>
        </Link> */}
      </div>
    </div>
  );
}
