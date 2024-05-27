import axios from "axios";
const key = "secret_C3YQ8qCGB4HHqs4uEHHC6IMLoELIkDbWDKx1Q2jeEsl";


export const notionUtil = async () => {

    const reply = await axios.get('https://api.notion.com/v1/blocks/b9cb1f7ad47f49b98bd11e90e5d9f85c/children',
        {
            headers: {
                "Authorization": `Bearer ${key}`,
                "Notion-Version": "2022-06-28"
            }
        }
    )
    const json = (await reply.json());
    const result = await Promise.all(await json.results.map(async b => {
        const reply = await axios.get(`https://api.notion.com/v1/blocks/${b.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${key}`,
                    "Notion-Version": "2022-06-28"
                }
            }
        )
        const bc = (await reply.json())
        return {
            name: bc.code?.caption[0]?.text.content,
            content: bc.code?.rich_text[0]?.plain_text,
        };
    }));

    return result.filter(x => x.name);
}
