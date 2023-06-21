import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({}).populate("creator");
    // !The find() method is used to query the database for documents that match certain criteria. It takes an optional filter object as the first argument, and returns a promise that resolves to an array of documents. For example, Prompt.find({title: "Hello World"}) would return all the prompts with the title “Hello World”.

    //!The populate() function is used to fetch related documents from other collections.

    //!the find() function is used to query all documents from the Prompt collection. The populate() function is then used to fetch the creator document from each Prompt document.

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Data couldn't be fetched", { status: 500 });
  }
};
