export interface SocialData {
  id: string;
  name: string;
  symbol: string;
  url: string;
  color: string;
  emissive: string;
}

export const socialsData: SocialData[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    symbol: "in",
    url: "https://www.linkedin.com/in/stefan-cornelius-9b2916a1/",
    color: "#0077b5",
    emissive: "#003b5c"
  },
  {
    id: "github",
    name: "GitHub",
    symbol: "git",
    url: "https://github.com/akagami007",
    color: "#333333",
    emissive: "#111111"
  },
  {
    id: "email",
    name: "Email",
    symbol: "@",
    url: "mailto:stefancorneliusjr@gmail.com",
    color: "#ea4335",
    emissive: "#822218"
  },
  {
    id: "phone",
    name: "Phone",
    symbol: "📞",
    url: "tel:+6282323572250",
    color: "#25d366",
    emissive: "#126c33"
  }
];
