import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/services/auth";
import { toast } from "sonner";
import { Image } from "../custom/Image";

 const Header = () => {
  const { user, loading } = useAuth();
  const { avatar, username } = user?.user_metadata || {};
  console.log(" user:", user);
  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      toast.error("Failed to logout");
    }
  }
  return (
    <div className="w-full bg-background border-b border-gray-300 dark:border-white  sticky top-0 z-50 ">
      <div className="px-12 py-2  h-full flex w-full items-center  justify-between">
        {/*<MobileSidebar />*/}
        <div className="w-full flex items-center gap-2">
          <Link to="/" className="">
            <Image
              alt="youtube-clone"
              className="size-16"
              src="/assets/images/logo.svg"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {username ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={avatar} alt="@shadcn" />
                    <AvatarFallback> {username} </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <button>Logout</button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/channels/${username}`}>My Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <div className="gap-4 flex items-center ">
              <Link
                to="/login"
                className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="mr-1 w-full bg-secondary px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;