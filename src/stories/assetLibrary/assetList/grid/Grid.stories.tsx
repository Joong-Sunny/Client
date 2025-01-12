import AssetGrid from "@/features/assetLibrary/body/assetList/grid/AssetGrid";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AssetGrid,
  title: "Feature/AssetLibrary/AssetList/Grid",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: "에셋 라이브러리 리스트 그리드 입니다.",
      },
    },
  },
} satisfies Meta<typeof AssetGrid>;

export default meta;
type Story = StoryObj<typeof AssetGrid>;

export const AssetLibraryGrid = {} satisfies Story;
