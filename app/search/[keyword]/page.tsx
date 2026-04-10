"use client";

import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import {
  useGetAbilityListQuery,
  useGetItemListQuery,
  useGetMoveListQuery,
  useGetNatureListQuery,
  useGetPokemonListQuery,
} from "@/store/services/pokeApi";
import { Result } from "@/types/Generation";
import { extractIdFromUrl } from "@/utils/heplers";

// Mock dữ liệu 5000 records
const MOCK_DATA = [
  { name: "Pikachu", type: "pokemon", id: 1 },
  { name: "Pichu", type: "pokemon", id: 9 },
  { name: "Piname", type: "items", id: 11 },
  { name: "Charizard", type: "pokemon", id: 2 },
  { name: "Potion", type: "items", id: 3 },
  { name: "Thunderbolt", type: "moves", id: 4 },
  { name: "Static", type: "abilities", id: 5 },
  { name: "Adamant", type: "natures", id: 6 },
  { name: "How to catch Shiny", type: "blog", id: 7 },
  // ... thêm data tại đây
];

export default function FuseSearch() {
  const [query, setQuery] = useState("");

  const { data: pokemon } = useGetPokemonListQuery(undefined);
  const { data: item } = useGetItemListQuery(undefined);
  const { data: move } = useGetMoveListQuery(undefined);
  const { data: ability } = useGetAbilityListQuery(undefined);
  const { data: nature } = useGetNatureListQuery(undefined);

  const test = [
    ...(pokemon?.results.map((p: Result) => ({
      name: p.name,
      type: "pokemon",
    })) || []),
    ...(item?.results.map((p: Result) => ({ name: p.name, type: "items" })) ||
      []),
    ...(move?.results.map((p: Result) => ({ name: p.name, type: "moves" })) ||
      []),
    ...(ability?.results.map((p: Result) => ({
      name: p.name,
      type: "abilities",
    })) || []),
    ...(nature?.results.map((p: Result) => ({
      name: p.name,
      type: "natures",
    })) || []),
  ];

  // 1. Cấu hình Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(test, {
      keys: ["name"], // Chỉ tìm theo tên
      threshold: 0.3, // 0.0 là khớp tuyệt đối, 1.0 là khớp tất cả. 0.3 là đẹp nhất cho typo.
      includeScore: true, // Để biết độ khớp của kết quả
      minMatchCharLength: 2, // Gõ 2 ký tự mới bắt đầu search
    });
  }, [test]);

  // 2. Xử lý Logic Tìm kiếm & Phân nhóm
  const groupedResults = useMemo(() => {
    if (!query) return {};

    const results = fuse.search(query);

    // Gom nhóm kết quả
    const groups: Record<string, any[]> = {};

    results.forEach(({ item }) => {
      if (!groups[item.type]) groups[item.type] = [];
      // Giới hạn hiển thị 4 kết quả mỗi nhóm để UI gọn gàng
      // if (groups[item.type].length < 4) {
      groups[item.type].push(item);
      // }
    });

    return groups;
  }, [query, fuse]);

  const hasResults = Object.keys(groupedResults).length > 0;

  return (
    <div className="min-h-screen bg-slate-50 p-10 font-sans">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl leading-5 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Gõ thử 'Pikaxu' (sai chính tả vẫn ra)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Panel Kết quả */}
        {query.length >= 2 && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[450px] overflow-y-auto">
              {!hasResults ? (
                <div className="p-10 text-center text-slate-400">
                  Không tìm thấy kết quả nào cho <b>"{query}"</b>
                </div>
              ) : (
                Object.entries(groupedResults).map(([type, items]) => (
                  <div
                    key={type}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <div className="bg-slate-50 px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                      {type} <span>{items.length} kết quả</span>
                    </div>
                    <div className="p-1">
                      {items.map((item, index) => (
                        <button
                          key={item.id}
                          className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-blue-50 rounded-xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                            <span className="text-slate-700 font-medium">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs text-slate-300 group-hover:text-blue-400">
                            →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] text-slate-400">
                Powered by Fuse.js Fuzzy Search
              </span>
              <div className="flex gap-2">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 shadow-sm">
                  ESC
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 shadow-sm">
                  ↵
                </kbd>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
