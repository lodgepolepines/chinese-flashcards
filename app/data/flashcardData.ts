export interface RelatedWord {
    word: string;
    pinyin: string;
    meaning: string;
  }
  
  export interface FlashcardData {
    word: string;
    pinyin: string;
    translation: string;
    example: string;
    etymology: string;
    character_components: {
      [key: string]: string | string[];  // Now accepts either a string or array of strings
    };
    korean_translation: string;
  }
  
export const flashcardsData: FlashcardData[] = [
    {
      "word": "应有尽有",
      "pinyin": "yīng yǒu jìn yǒu",
      "translation": "to have everything that one should have; complete; comprehensive",
      "example": "这家商场应有尽有，你想要的都能买到。",
      "etymology": "Classical Chinese idiom expressing completeness",
      "character_components": {
        "应": "广 (wide) + 心 (heart)",
        "有": "有 (have)",
        "尽": "尺 (ruler) + 入 (enter)"
      },
      "korean_translation": "모든 것이 다 있다"
    },
    {
      "word": "奢华",
      "pinyin": "shē huá",
      "translation": "luxurious; extravagant",
      "example": "这家酒店非常奢华。",
      "etymology": "Combines 奢 (extravagant) with 华 (splendid)",
      "character_components": {
        "奢": "大 (big) + 者 (person)",
        "华": "艹 (grass) + 匕 (spoon)"
      },
      "korean_translation": "호화롭다"
    },
    {
      "word": "澡堂",
      "pinyin": "zǎo táng",
      "translation": "bathhouse; public bath",
      "example": "以前的北京到处都是澡堂。",
      "etymology": "Traditional term combining 澡 (bath) with 堂 (hall)",
      "character_components": {
        "澡": "氵(water) + 喿 (noise)",
        "堂": "土 (earth) + 尚 (still)"
      },
      "korean_translation": "목욕탕"
    },
    {
      "word": "键盘侠",
      "pinyin": "jiàn pán xiá",
      "translation": "keyboard warrior, internet troll",
      "example": "他在网上总是嘴巴很硬,是一个典型的键盘侠。",
      "etymology": "The term originated from internet slang, referring to people who behave aggressively or make provocative comments online but are unlikely to act that way in real life.",
      "character_components": {
        "键": ["扌 (hand radical)", "建 (build)"],
        "盘": ["皿 (dish radical)", "分 (divide)"],
        "侠": ["亻 (human radical)", "佭 (phonetic component)"]
      },
      "korean_translation": "키보드 워리어"
    },
    {
      word: "气候",
      pinyin: "qì hòu",
      translation: "climate, weather",
      example: "气候变化正在影响着我们的生活。",
      etymology: "The word '气候' is composed of two characters: '气' meaning 'air' or 'gas', and '候' meaning 'to wait' or 'to expect'. Together, they refer to the state of the atmosphere that is expected or awaited.",
      character_components: {"气":"气 = 气 (气, air) + 气 (气, air)","候":"候 = 佖 (radical representing a person) + 侯 (marquis)"},
      korean_translation: "기후"
    },
    {
      word: "乱七八糟",
      pinyin: "luàn qī bā zāo",
      translation: "messy, disorderly, chaotic, in a jumble",
      example: "房间里乱七八糟的,到处都是衣服和书本。",
      etymology: "The phrase is derived from the chaotic and disorderly appearance of the numbers 7 and 8 when written together. It has been in use since the Qing Dynasty.",
      character_components: {"乱":"乚 (radical for 'grass') + 乡 (village)","七":"一 (one) + 匕 (radical for 'spoon')","八":"八 (radical for 'split')","糟":"米 (rice) + 且 (moreover)"},
      korean_translation: "어지럽게 뒤섞인"
    },
    {
      word: "我心情很好",
      pinyin: "wǒ xīnqíng hěn hǎo",
      translation: "I'm in a very good mood",
      example: "今天天气很好,我心情很好。",
      etymology: "The phrase '我心情很好' is a common expression in Mandarin Chinese, composed of the following words: '我' (I), '心情' (mood or feeling), '很' (very), and '好' (good). It is a straightforward phrase that expresses the speaker's positive emotional state.",
      character_components: {"我":"戈 (radical for 'spear') + 折 (to bend)","心":"心 (radical for 'heart')","情":"忄 (radical for 'heart') + 青 (green/blue)","很":"彳 (radical for 'step') + 艮 (mountain/stop)","好":"女 (radical for 'female') + 子 (child)"},
      korean_translation: "제 기분이 매우 좋습니다."
    },
    {
      word: "幸运",
      pinyin: "xìng yùn",
      translation: "good luck, fortune, happiness",
      example: "祝你幸运!",
      etymology: "The word '幸运' is composed of two characters: '幸' meaning 'fortunate' or 'lucky', and '运' meaning 'luck' or 'fortune'. The character '幸' is derived from an ancient pictogram representing a person with outstretched arms, symbolizing joy or happiness. The character '运' originally depicted a rolling wheel or movement, suggesting the idea of something being in motion or progressing.",
      character_components: {"幸":"干 (radical for 'dry') + 𤱔 (phonetic component)","运":"運 (radical for 'vehicle') + 彖 (phonetic component)"},
      korean_translation: "행운"
    }];
