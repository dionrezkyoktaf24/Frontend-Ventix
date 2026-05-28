import re
import json

html = """
<div class="flex min-h-screen">
<!-- SideNavBar -->
<aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-inverse-surface shadow-md py-stack-md z-40 transition-all">
<div class="px-6 mb-stack-xl">
<span class="font-display-lg text-display-lg font-black text-primary tracking-tighter">Ventix</span>
</div>
<div class="flex flex-col gap-2 flex-grow">
<!-- Dashboard Active -->
<a class="flex items-center gap-4 bg-secondary-container text-on-secondary-container rounded-xl px-4 py-3 mx-2 translate-x-1 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-xl px-4 py-3 mx-2 transition-all" href="#">
<span class="material-symbols-outlined" data-icon="confirmation_number">confirmation_number</span>
<span class="font-label-md text-label-md">My Tickets</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-xl px-4 py-3 mx-2 transition-all" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="font-label-md text-label-md">Payments</span>
</a>
<a class="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-xl px-4 py-3 mx-2 transition-all" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md text-label-md">Settings</span>
</a>
<div class="mt-auto pt-stack-md border-t border-outline-variant/20">
<a class="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-highest rounded-xl px-4 py-3 mx-2 transition-all" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-label-md text-label-md">Help Center</span>
</a>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-grow md:ml-64 min-h-screen p-margin-mobile md:p-margin-desktop">
<!-- Top Profile Summary -->
<header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md mb-stack-xl">
<div>
<h1 class="font-headline-lg text-headline-lg text-on-background">Welcome back, Aditama</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Here's what's happening with your events today.</p>
</div>
<div class="flex items-center gap-stack-md bg-surface-container-low p-2 rounded-full border border-outline-variant/30 shadow-sm pr-6">
<img alt="User Profile" class="w-12 h-12 rounded-full object-cover border-2 border-primary-container" data-alt="A professional close-up portrait of a young man with a friendly expression, set against a blurred urban background. The lighting is soft and natural, emphasizing clean textures and a modern aesthetic. The overall tone is bright and high-end, matching a premium corporate dashboard style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgYiQTiwnf-Heo2otmj3ZTjFiVJXYjg9_VTj_ZGZFJJFeZxspXf2vCqKhMsIRkS5CYBRBIvbCf29k7UZYDXb1u33AYyElGDU5OR8K-grWcVjexpZETQPygNb18yAAmOggq5k_5a2LlnE1Pzp9LrUuiWRPM-zffJc6fpxn5tSMu0QnJTaP7v_NdYsCNYN2M1kBRdzf1cfTTH4vTfbfuAncbNx5QWKqGpgMiTL5jSum-Y0fHmFOLCiAtLZ6UuoJB8qy-88P6_eKmXrX4">
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface">Aditama Putra</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Pro Member</span>
</div>
</div>
</header>
<!-- Quick Stats / Bento Area -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-stack-lg mb-stack-xl">
<div class="bg-surface-container-low p-stack-lg rounded-lg border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow">
<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
<span class="material-symbols-outlined" data-icon="confirmation_number">confirmation_number</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Tickets</span>
<p class="font-display-lg text-headline-lg mt-1">04</p>
</div>
<div class="bg-surface-container-low p-stack-lg rounded-lg border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow">
<div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Events Attended</span>
<p class="font-display-lg text-headline-lg mt-1">12</p>
</div>
<div class="bg-surface-container-low p-stack-lg rounded-lg border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow">
<div class="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
<span class="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Spent</span>
<p class="font-display-lg text-headline-lg mt-1">Rp 2.4M</p>
</div>
</section>
<!-- Tiket Saya Grid -->
<section class="mb-stack-xl">
<div class="flex justify-between items-end mb-stack-lg">
<div>
<h2 class="font-headline-md text-headline-md">Tiket Saya</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Upcoming events you are attending</p>
</div>
<button class="text-primary font-label-md hover:underline transition-all">View All</button>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
<!-- Ticket Card 1 -->
<div class="group bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
<div class="relative h-48 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A high-energy electronic music festival with vibrant neon purple and blue stage lighting illuminating a large crowd. The atmosphere is electric and premium, with sharp focus on the light beams and modern stage design. The image has a clean, airy quality with deep contrasts." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBay41PCF2S9HCswGnjgEWnkgGlsLKkp85DvOdQ9fHsrVGSpg_KLz8DQZy6TvpteTC4duh37Y8vw8tZQPDjpC552tEImH36V4cOTet64iTMyXBOGcNb-09e0YLLbrCzDTfVcEOL0nvRUDGB0lwHLBZRyUy3uQtJlONiB-80M6RMi6PJ4sp1-n9l6JC_wc-1vNi70nyMBe7-4b9BUFSwysLEZ2sBwAcoeTMMvhjSOPw2T60SRbpZGV118sDE_wGadlR7fdFcg6E2wm_0">
<div class="absolute top-4 right-4 px-3 py-1 bg-primary text-white font-label-sm rounded-full">Music</div>
</div>
<div class="p-stack-md">
<h3 class="font-headline-md text-headline-md mb-2">Summer Soundwave 2024</h3>
<div class="flex items-center gap-2 text-on-surface-variant mb-4">
<span class="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
<span class="font-body-sm text-body-sm">15 July, 2024 • 19:00</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-outline-variant/10">
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-variant flex items-center justify-center text-[10px] font-bold">+3</div>
</div>
<button class="bg-secondary text-white px-4 py-2 rounded-lg font-label-md hover:brightness-110 transition-all">Details</button>
</div>
</div>
</div>
<!-- Ticket Card 2 -->
<div class="group bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
<div class="relative h-48 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A sophisticated tech conference hall with a large digital screen displaying abstract data visualizations in blues and purples. The seating is arranged in a modern, spacious manner with soft warm spotlights. The aesthetic is professional, minimalist, and high-tech corporate." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6cVonacnScdO1IW4O1tP-Fe6GcZOAXbR_zaCO9bhae26AFCdCWOFsuGfVakIX8FcYrM_RvukS08mEaThDWAcoHNzE8l4SQpli8tQJuNh4TawwUh4j9sD7781uWQGEPlrarMyy1buGYR6K82LWfJ15aPsE0JfZBmQgEh8-XmqhHDuNH6poIi5NpnStlWzy_Lo8DFuIqfBcv6LhGoGLRMc-ma0rbY8-d5G2Oi6aqnRfH_pcxDXMSyUHpp6QxUUxCMLrV9XYo9DfpvW-">
<div class="absolute top-4 right-4 px-3 py-1 bg-tertiary text-white font-label-sm rounded-full">Tech</div>
</div>
<div class="p-stack-md">
<h3 class="font-headline-md text-headline-md mb-2">Future Tech Summit</h3>
<div class="flex items-center gap-2 text-on-surface-variant mb-4">
<span class="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
<span class="font-body-sm text-body-sm">22 Aug, 2024 • 09:00</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-outline-variant/10">
<div class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="location_on">location_on</span>
<span class="font-label-sm text-label-sm">Jakarta, ID</span>
</div>
<button class="bg-secondary text-white px-4 py-2 rounded-lg font-label-md hover:brightness-110 transition-all">Details</button>
</div>
</div>
</div>
<!-- Ticket Card 3 -->
<div class="group bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/20 shadow-[0_24px_32px_-12px_rgba(79,70,229,0.06)] hover:-translate-y-1 transition-all duration-300">
<div class="relative h-48 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A high-end gourmet culinary event featuring beautifully plated modern dishes under warm, elegant restaurant lighting. The scene is clean and upscale, with a focus on artisanal details and a sophisticated neutral color palette with gold accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkkMeN-0-Ri0ZK6zXODWbclFCTGNotuYsjYcfEh6-cRLhxxtAt2PK68Z8PEhUd-vWdhRk2C67uZMifC2FSclWlU9U5NSspv6ajEx8l1CmlIHrKOdQ9j1XgvAiGMmMCMb-P50Pyeacsea40glLZYx2L0Z4ttbbBA3KrNXTZIWEAT4Gt1ylO2BaYfW6k9QbH6bCiI6VK3TezEuUbeGlx3ih7_h2N3gjF8elhPKua9cARAaTqJHjpcXiuAw1oaO2w5UNAK4z8RG3k11UZ">
<div class="absolute top-4 right-4 px-3 py-1 bg-primary-container text-white font-label-sm rounded-full">Food</div>
</div>
<div class="p-stack-md">
<h3 class="font-headline-md text-headline-md mb-2">Gourmet Night 2024</h3>
<div class="flex items-center gap-2 text-on-surface-variant mb-4">
<span class="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
<span class="font-body-sm text-body-sm">05 Sept, 2024 • 20:00</span>
</div>
<div class="flex items-center justify-between pt-4 border-t border-outline-variant/10">
<div class="flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[18px]" data-icon="confirmation_number">confirmation_number</span>
<span class="font-label-sm text-label-sm">2 Tickets</span>
</div>
<button class="bg-secondary text-white px-4 py-2 rounded-lg font-label-md hover:brightness-110 transition-all">Details</button>
</div>
</div>
</div>
</div>
</section>
<!-- Transaction History -->
<section class="bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden">
<div class="p-stack-lg flex justify-between items-center border-b border-outline-variant/10">
<div>
<h2 class="font-headline-md text-headline-md">Transaction History</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Manage your recent payments and invoices</p>
</div>
<button class="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-label-md hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
                        Filter
                    </button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="bg-surface-container-low text-on-surface-variant border-b border-outline-variant/10">
<th class="px-6 py-4 font-label-md text-label-md">Order ID</th>
<th class="px-6 py-4 font-label-md text-label-md">Event</th>
<th class="px-6 py-4 font-label-md text-label-md">Date</th>
<th class="px-6 py-4 font-label-md text-label-md">Amount</th>
<th class="px-6 py-4 font-label-md text-label-md">Status</th>
<th class="px-6 py-4 font-label-md text-label-md text-center">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4 font-body-sm text-on-surface">#VX-9921</td>
<td class="px-6 py-4 font-body-sm text-on-surface">Summer Soundwave 2024</td>
<td class="px-6 py-4 font-body-sm text-on-surface-variant">Jun 12, 2024</td>
<td class="px-6 py-4 font-body-sm text-on-surface font-semibold">Rp 850.000</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Paid</span>
</td>
<td class="px-6 py-4 text-center">
<button class="text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="download">download</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4 font-body-sm text-on-surface">#VX-8812</td>
<td class="px-6 py-4 font-body-sm text-on-surface">Future Tech Summit</td>
<td class="px-6 py-4 font-body-sm text-on-surface-variant">Jun 05, 2024</td>
<td class="px-6 py-4 font-body-sm text-on-surface font-semibold">Rp 1.250.000</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Pending</span>
</td>
<td class="px-6 py-4 text-center">
<button class="text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low/50 transition-colors">
<td class="px-6 py-4 font-body-sm text-on-surface">#VX-7723</td>
<td class="px-6 py-4 font-body-sm text-on-surface">Coffee Workshop</td>
<td class="px-6 py-4 font-body-sm text-on-surface-variant">May 28, 2024</td>
<td class="px-6 py-4 font-body-sm text-on-surface font-semibold">Rp 300.000</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelled</span>
</td>
<td class="px-6 py-4 text-center">
<button class="text-on-surface-variant hover:text-on-surface transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Footer -->
<footer class="flex flex-col md:flex-row justify-between items-center py-stack-xl mt-stack-xl border-t border-outline-variant/20 gap-stack-md text-on-surface-variant">
<p class="font-body-sm text-body-sm">© 2024 Ventix Ticketing. All rights reserved.</p>
<div class="flex gap-stack-md">
<a class="font-label-sm text-label-sm hover:underline transition-all" href="#">Privacy Policy</a>
<a class="font-label-sm text-label-sm hover:underline transition-all" href="#">Terms of Service</a>
<a class="font-label-sm text-label-sm hover:underline transition-all" href="#">Support</a>
</div>
</footer>
</main>
</div>
<!-- Mobile Navigation Bar -->
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-md border-t border-outline-variant/10 px-6 py-3 flex justify-between items-center z-50">
<a class="flex flex-col items-center gap-1 text-primary" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="text-[10px] font-bold">Dashboard</span>
</a>
<a class="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="confirmation_number">confirmation_number</span>
<span class="text-[10px] font-medium">Tickets</span>
</a>
<a class="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span class="text-[10px] font-medium">History</span>
</a>
<a class="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="text-[10px] font-medium">Settings</span>
</a>
</nav>
"""

class_maps = {
    # Colors
    "bg-surface": "bg-[#f9f9ff]",
    "text-on-surface": "text-[#141b2b]",
    "bg-surface-container-low": "bg-[#f1f3ff]",
    "dark:bg-inverse-surface": "dark:bg-[#293040]",
    "text-primary": "text-[#4d41df]",
    "bg-secondary-container": "bg-[#645efb]",
    "text-on-secondary-container": "text-[#fffbff]",
    "text-on-surface-variant": "text-[#464555]",
    "hover:bg-surface-container-highest": "hover:bg-[#dce2f7]",
    "border-outline-variant/20": "border-[#c7c4d8]/20",
    "border-outline-variant/30": "border-[#c7c4d8]/30",
    "border-outline-variant/10": "border-[#c7c4d8]/10",
    "border-outline-variant": "border-[#c7c4d8]",
    "text-on-background": "text-[#141b2b]",
    "border-primary-container": "border-[#675df9]",
    "bg-primary/10": "bg-[#4d41df]/10",
    "bg-secondary/10": "bg-[#4b41e1]/10",
    "bg-tertiary/10": "bg-[#914800]/10",
    "text-secondary": "text-[#4b41e1]",
    "text-tertiary": "text-[#914800]",
    "bg-surface-container-lowest": "bg-[#ffffff]",
    "bg-primary-container": "bg-[#675df9]",
    "hover:bg-surface-container-low/50": "hover:bg-[#f1f3ff]/50",
    "hover:bg-surface-container-low": "hover:bg-[#f1f3ff]",
    "bg-surface/80": "bg-[#f9f9ff]/80",
    "bg-surface-variant": "bg-[#dce2f7]",

    # Spacing
    "mb-stack-xl": "mb-[64px]",
    "p-stack-md": "p-[16px]",
    "gap-stack-md": "gap-[16px]",
    "mb-stack-lg": "mb-[32px]",
    "p-margin-mobile": "p-[20px]",
    "md:p-margin-desktop": "md:p-[64px]",
    "gap-stack-lg": "gap-[32px]",
    "p-stack-lg": "p-[32px]",
    "pt-stack-md": "pt-[16px]",
    "py-stack-md": "py-[16px]",
    "py-stack-xl": "py-[64px]",
    "mt-stack-xl": "mt-[64px]",

    # Typography
    "font-display-lg": "font-['Plus_Jakarta_Sans',_sans-serif]",
    "text-display-lg": "text-[48px] font-[800] leading-[1.1] tracking-[-0.02em]",
    "font-headline-lg": "font-['Plus_Jakarta_Sans',_sans-serif]",
    "text-headline-lg": "text-[32px] font-[700] leading-[1.2]",
    "font-headline-md": "font-['Plus_Jakarta_Sans',_sans-serif]",
    "text-headline-md": "text-[24px] font-[700] leading-[1.3]",
    "font-body-lg": "font-['Inter',_sans-serif]",
    "text-body-lg": "text-[18px] font-[400] leading-[1.6]",
    "font-body-md": "font-['Inter',_sans-serif]",
    "text-body-md": "text-[16px] font-[400] leading-[1.5]",
    "font-body-sm": "font-['Inter',_sans-serif]",
    "text-body-sm": "text-[14px] font-[400] leading-[1.5]",
    "font-label-md": "font-['Inter',_sans-serif]",
    "text-label-md": "text-[14px] font-[600] leading-[1] tracking-[0.01em]",
    "font-label-sm": "font-['Inter',_sans-serif]",
    "text-label-sm": "text-[12px] font-[500] leading-[1] tracking-[0.02em]"
}

def map_classes(match):
    classes = match.group(1).split()
    mapped = []
    for c in classes:
        mapped.append(class_maps.get(c, c))
    return 'className="' + ' '.join(mapped) + '"'

jsx = re.sub(r'class="([^"]*)"', map_classes, html)

# Fix HTML to JSX specifically
jsx = jsx.replace('<!--', '{/*')
jsx = jsx.replace('-->', '*/}')
jsx = re.sub(r'<img(.*?)(?<!/)>', r'<img\1 />', jsx)
jsx = re.sub(r'<input(.*?)(?<!/)>', r'<input\1 />', jsx)

# Remove the script block
jsx = re.sub(r'<script>.*?</script>', '', jsx, flags=re.DOTALL)

with open('c:/Users/MSII/.gemini/antigravity-ide/scratch/ventix/jsx_output.txt', 'w', encoding='utf-8') as f:
    f.write(jsx)

print("Done")
