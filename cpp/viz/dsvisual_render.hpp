// cpp/viz/dsvisual_render.hpp — runtime-free SVG snapshots, dsvisual node-box style.
#ifndef DSVISUAL_RENDER_HPP
#define DSVISUAL_RENDER_HPP
#include <string>
#include <vector>

namespace dsvisual {

inline std::string boxes_svg(const std::vector<int>& items, const std::string& title) {
    const int bw = 60, bh = 40, gap = 10, pad = 20;
    const int w = pad * 2 + (int)items.size() * (bw + gap);
    const int h = 90;
    std::string s = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" +
        std::to_string(w) + "\" height=\"" + std::to_string(h) + "\" viewBox=\"0 0 " +
        std::to_string(w) + " " + std::to_string(h) + "\">";
    s += "<text x=\"" + std::to_string(pad) + "\" y=\"18\" font-family=\"monospace\" font-size=\"14\">" + title + "</text>";
    for (size_t i = 0; i < items.size(); ++i) {
        int x = pad + (int)i * (bw + gap);
        s += "<rect x=\"" + std::to_string(x) + "\" y=\"35\" width=\"" + std::to_string(bw) +
             "\" height=\"" + std::to_string(bh) + "\" fill=\"#ECECFF\" stroke=\"#9370DB\"/>";
        s += "<text x=\"" + std::to_string(x + bw / 2) + "\" y=\"60\" font-family=\"monospace\" font-size=\"14\" "
             "text-anchor=\"middle\">" + std::to_string(items[i]) + "</text>";
    }
    s += "</svg>";
    return s;
}

inline std::string stack_svg(const std::vector<int>& items) { return boxes_svg(items, "stack (bottom -> top)"); }
inline std::string queue_svg(const std::vector<int>& items) { return boxes_svg(items, "queue (front -> back)"); }

} // namespace dsvisual
#endif
