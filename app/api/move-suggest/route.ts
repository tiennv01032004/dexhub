import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pokemonName } = await req.json();

    console.log(pokemonName);

    const pokeRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    );

    if (!pokeRes.ok) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    const pokeData = await pokeRes.json();
    const stats = pokeData.stats
      .map((s: any) => `${s.stat.name}: ${s.base_stat}`)
      .join(", ");
    const types = pokeData.types.map((t: any) => t.type.name).join("/");
    const validMovesSet = new Set(
      pokeData.moves.map((m: any) => m.move.name.toLowerCase()),
    );

    // Lấy 150 chiêu cuối (Chiêu mạnh thường nằm ở cuối danh sách API)
    const limitedMoves = Array.from(validMovesSet);

    // 2. Gọi Groq với Prompt tối ưu
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are a Pokemon VGC Expert. 
              Instruction: Create 3 COMPETITIVE builds.
              Rules:
              - Include STAB moves matching the Pokemon's type.
              - Ensure moves match the highest offensive stat.
              - Output ONLY a JSON object.
              - ONLY use moves from the provided list [${limitedMoves.join(", ")}]
              `,
            },
            {
              role: "user",
              content: `Pokemon: ${pokemonName} (Type: ${types}, Stats: ${stats}).
              Allowed Moves: [${limitedMoves.join(", ")}].
              
              Required JSON Format: 
              {
                "builds": [
                  {
                    "name": "competitive name" (e.g. Attack, Defense,...)
                    "moves": ["move1", "move2", "move3", "move4"],
                    "ability": "competitive ability",
                    "item": "competitive held item",
                    "summary": "Short explanation of the strategy"
                  }
                ]
              }`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.0,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      // Kiểm tra nếu là lỗi Rate Limit (429)
      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              "The system is busy due to a high volume of requests. Please wait 1 minute and try again!",
          },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { error: errorData.error.message },
        { status: response.status },
      );
    }

    const data = await response.json();
    const aiContent = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(aiContent);
  } catch (error: any) {
    console.error("Groq Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
