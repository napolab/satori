type LoadGoogleFontOptions = {
  family: string;
  weight?: number;
  text?: string;
};

export async function loadGoogleFont({ family, weight, text }: LoadGoogleFontOptions) {
  const params: Record<string, string> = {
    family: `${encodeURIComponent(family)}${weight ? `:wght@${weight}` : ""}`,
  };

  if (text) {
    params.text = text;
  } else {
    params.subset = "latin";
  }

  const url = `https://fonts.googleapis.com/css2?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;

  const res = await fetch(`${url}`, {
    headers: {
      get "User-Agent"() {
        return "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";
      },
    },
  });

  const body = await res.text();
  const fontUrl = body.match(/src: url\((.+)\) format\('(?:opentype|truetype)'\)/)?.[1];

  if (!fontUrl) {
    throw new Error("Could not find font URL");
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}
