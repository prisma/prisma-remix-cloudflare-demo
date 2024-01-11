import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getDB } from "~/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const numUsers = await getDB(context.env.DATABASE_URL).user.count();
  return {
    message: `Hello world - DB fetch was successful and we saw ${numUsers} users`,
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Basic Prisma + Remix + Cloudflare demo</h1>
      <p>{data.message}</p>
    </div>
  );
}
