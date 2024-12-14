import Image from "next/image";
import { signOut } from "~/server/auth";

interface UserBadgeProps {
  name: string;
  image: string;
}

export default async function UserBadge({ name, image }: UserBadgeProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="text-right text-sm">
        <div>{name}</div>
        <button
          className="font-light hover:underline"
          onClick={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </button>
      </div>
      {image && (
        <Image
          src={image}
          alt=""
          width="48"
          height="48"
          className="rounded-full"
        ></Image>
      )}
    </div>
  );
}
