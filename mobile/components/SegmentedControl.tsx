import { Pressable, Text, View } from 'react-native';

type Tab = {
    key: string;
    label: string;
};

type SegmentedControlProps = {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabKey: string) => void;
};

export function SegmentedControl({
    tabs,
    activeTab,
    onTabChange,
}: SegmentedControlProps) {
    return (
        <View className="px-6 py-2">
            <View
                className="flex-row rounded-full bg-[#f2f2eb] p-1"
                style={{
                    shadowColor: '#d1d1c7',
                    shadowOffset: { width: 4, height: 4 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    elevation: 4,
                }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <Pressable
                            key={tab.key}
                            onPress={() => onTabChange(tab.key)}
                            className={`flex-1 items-center justify-center rounded-full py-3 ${
                                isActive ? 'bg-[#6c8f66]' : ''
                            }`}
                        >
                            <Text
                                className={`text-xs font-bold tracking-wide ${
                                    isActive ? 'text-white' : 'text-[#737972]'
                                }`}
                            >
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
