import re

with open('src/app/home-client.tsx', 'r') as f:
    content = f.read()

# 1. Stats Bar
stats_search = r'''    \{\/\* Stats Bar \*\/\}
    <section className="bg-slate-50 border-b border-slate-200/60 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <span className="font-display block text-3xl font-black text-slate-900">2010</span>'''

stats_replace = r'''    {/* Stats Bar */}
    <section className="bg-slate-50 border-b border-slate-200/60 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <span className="font-display block text-3xl font-black text-slate-900">2010</span>'''

if stats_search in content:
    content = content.replace(stats_search, stats_replace)

content = content.replace(
    '''            <div>
                <span className="font-display block text-3xl font-black text-slate-900">180+</span>''',
    '''            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <span className="font-display block text-3xl font-black text-slate-900">180+</span>'''
)

content = content.replace(
    '''            <div>
                <span className="font-display block text-3xl font-black text-slate-900">SOAS University</span>''',
    '''            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                <span className="font-display block text-3xl font-black text-slate-900">SOAS University</span>'''
)

content = content.replace(
    '''            <div>
                <span className="font-display block text-3xl font-black text-slate-900">Global</span>''',
    '''            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                <span className="font-display block text-3xl font-black text-slate-900">Global</span>'''
)

# Fix the closing divs for stats bar
# They originally were just </div> each. We changed the opening to <motion.div>.
# Let's use regex to find the stats block and replace </div> with </motion.div> for those 4.
stats_block_pattern = r'(<motion\.div.*?>\s*<span.*?>.*?</span>\s*<span.*?>.*?</span>\s*)</div>'
content = re.sub(stats_block_pattern, r'\1</motion.div>', content)

# 2. About section Header
about_header_search = r'''    {/* Corporate & Media Infrastructure */}
    <section id="about" className="py-20 md:py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 space-y-4">
                <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Core Operations</span>'''
about_header_replace = r'''    {/* Corporate & Media Infrastructure */}
    <section id="about" className="py-20 md:py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="max-w-3xl mb-16 space-y-4">
                <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Core Operations</span>'''
content = content.replace(about_header_search, about_header_replace)

content = content.replace(
    '''            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
                {/* Magazine Card */}
                <div className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">''',
    '''            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
                {/* Magazine Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">'''
)
# We also have to fix the original closing tag if we used simple replace, wait, we replaced <div className="max-w-3xl..."> with <motion.div...>, so we must replace the closing </div> with </motion.div>.
content = content.replace('''                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
                {/* Magazine Card */}
                <div className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">''',
'''                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
                {/* Magazine Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">''')


content = content.replace(
    '''                {/* Corporate Entity Card */}
                <div className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">''',
    '''                {/* Corporate Entity Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">'''
)

content = content.replace(
    '''                {/* Featured Publication */}
                <div className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">''',
    '''                {/* Featured Publication */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="border border-slate-200 hover:border-slate-400 hover:shadow-md rounded-2xl transition-all p-8 flex flex-col justify-between bg-slate-50/50">'''
)

# Fix the closing div for those 3 cards
card1_close = r'''                    <a href="https://prgi.gov.in" target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandDark transition-colors uppercase tracking-wider">
                        PRGI Verification <i className="fa-solid fa-square-arrow-up-right text-[10px]"></i>
                    </a>
                </div>'''
content = content.replace(card1_close, card1_close.replace('</div>', '</motion.div>'))

card2_close = r'''                    <a href="https://tracxn.com/d/legal-entities/india/vishwa-leader-techmedia-private-limited/__jDthDz58Owry-yAaHPhKSuhVYScE1DyjR4IGLp2Bhz8" target="_blank" className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandDark transition-colors uppercase tracking-wider">
                        MCA Profile <i className="fa-solid fa-square-arrow-up-right text-[10px]"></i>
                    </a>
                </div>'''
content = content.replace(card2_close, card2_close.replace('</div>', '</motion.div>'))

card3_close = r'''                    <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-brandBlue hover:text-brandDark transition-colors uppercase tracking-wider">
                        Request Copy <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                </div>'''
content = content.replace(card3_close, card3_close.replace('</div>', '</motion.div>'))

# 3. Schedule Section
sched_header = r'''            {/* Event Schedule Header */}
            <div className="max-w-3xl mb-12 space-y-4 text-center mx-auto">
                <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Event Schedule</span>'''
sched_header_rep = r'''            {/* Event Schedule Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-12 space-y-4 text-center mx-auto">
                <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Event Schedule</span>'''
content = content.replace(sched_header, sched_header_rep)

content = content.replace(
'''                <p className="text-slate-500 leading-relaxed text-sm">
                    Overview of the main academic, business, and award events taking place in London from September 18th to September 20th, 2026.
                </p>
            </div>''',
'''                <p className="text-slate-500 leading-relaxed text-sm">
                    Overview of the main academic, business, and award events taking place in London from September 18th to September 20th, 2026.
                </p>
            </motion.div>'''
)

content = content.replace(
    '''                {/* Day 1 Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col justify-between group">''',
    '''                {/* Day 1 Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col justify-between group">'''
)

content = content.replace(
    '''                {/* Day 2 Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col justify-between group">''',
    '''                {/* Day 2 Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col justify-between group">'''
)

content = content.replace(
    '''                {/* Day 3 Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col justify-between group">''',
    '''                {/* Day 3 Card */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col justify-between group">'''
)

sched_card1_close = r'''                        <a data-field="announcements.abstractLink" href="/call-for-papers" className="block text-center border border-slate-250 text-slate-700 bg-slate-50 hover:bg-brandBlue hover:text-white hover:border-brandBlue font-bold py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Submit Abstract
                        </a>
                    </div>
                </div>'''
content = content.replace(sched_card1_close, sched_card1_close.replace('</div>\n                </div>', '</div>\n                </motion.div>'))

sched_card2_close = r'''                        <a data-field="announcements.businessLink" href="/business-summit" className="block text-center border border-slate-250 text-slate-700 bg-slate-50 hover:bg-brandBlue hover:text-white hover:border-brandBlue font-bold py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Register for Summit
                        </a>
                    </div>
                </div>'''
content = content.replace(sched_card2_close, sched_card2_close.replace('</div>\n                </div>', '</div>\n                </motion.div>'))

sched_card3_close = r'''                        <a data-field="announcements.awardLink" href="/awards" className="block text-center border border-slate-250 text-slate-700 bg-slate-50 hover:bg-brandBlue hover:text-white hover:border-brandBlue font-bold py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Nominate / Attend
                        </a>
                    </div>
                </div>'''
content = content.replace(sched_card3_close, sched_card3_close.replace('</div>\n                </div>', '</div>\n                </motion.div>'))


# 4. Conference details
conf_text = r'''                <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Academic Invitation</span>'''
conf_text_rep = r'''                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Academic Invitation</span>'''
content = content.replace(conf_text, conf_text_rep)

content = content.replace(
'''                        <a href="/auth/member?tab=submissions" className="border border-slate-350 text-slate-700 bg-white hover:bg-slate-50 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Submit Abstract
                        </a>
                    </div>
                </div>
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">''',
'''                        <a href="/auth/member?tab=submissions" className="border border-slate-350 text-slate-700 bg-white hover:bg-slate-50 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Submit Abstract
                        </a>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 order-2 lg:order-1">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">'''
)

conf_box_close = r'''                            <li className="flex gap-2"><i className="fa-solid fa-graduation-cap text-brandBlue mt-0.5"></i> <span>Diaspora Mobilization & Advocacy</span></li>
                        </ul>
                    </div>
                </div>'''
content = content.replace(conf_box_close, conf_box_close.replace('</div>\n                </div>', '</div>\n                </motion.div>'))

# 5. Business summit
bus_text = r'''                <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Business Participation</span>'''
bus_text_rep = r'''                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-bold tracking-widest text-brandBlue uppercase">Business Participation</span>'''
content = content.replace(bus_text, bus_text_rep)

content = content.replace(
'''                        <a href="/auth/member" className="border border-slate-350 text-slate-700 bg-white hover:bg-slate-50 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Register as Business Delegate
                        </a>
                    </div>
                </div>
                <div className="lg:col-span-5">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">''',
'''                        <a href="/auth/member" className="border border-slate-350 text-slate-700 bg-white hover:bg-slate-50 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Register as Business Delegate
                        </a>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">'''
)

bus_box_close = r'''                            <li className="flex gap-2"><i className="fa-solid fa-circle-check text-brandBlue mt-0.5"></i> <span>Cross-border Trade & Compliance Forums</span></li>
                        </ul>
                    </div>
                </div>'''
content = content.replace(bus_box_close, bus_box_close.replace('</div>\n                </div>', '</div>\n                </motion.div>'))


with open('src/app/home-client.tsx', 'w') as f:
    f.write(content)

