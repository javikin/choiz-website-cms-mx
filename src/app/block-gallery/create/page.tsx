import { BlockEditorClient } from "./BlockEditorClient";

export const metadata = {
  title: "Crear Bloque | Block Gallery",
  description: "Editor visual para crear nuevos bloques TinaCMS",
};

export default function CreateBlockPage() {
  return <BlockEditorClient />;
}
