import re

with open('src/app/home-client.tsx', 'r') as f:
    content = f.read()

# 6. Awards Section
awards_text = r'''                <div className="lg:col-span-5 order-2 lg:order-1">
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">'''
awards_text_rep = r'''                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 order-2 lg:order-1">
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">'''
content = content.replace(awards_text, awards_text_rep)

content = content.replace(
'''                            <li className="flex gap-2"><i className="fa-solid fa-trophy text-amber-500 mt-0.5"></i> <span>Innovative Community Service</span></li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">''',
'''                            <li className="flex gap-2"><i className="fa-solid fa-trophy text-amber-500 mt-0.5"></i> <span>Innovative Community Service</span></li>
                        </ul>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-7 order-1 lg:order-2 space-y-6">'''
)

awards_box_close = r'''                        <a href="/awards" className="border border-slate-350 text-slate-700 bg-white hover:bg-slate-50 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition-all">
                            Submit Nomination
                        </a>
                    </div>
                </div>'''
content = content.replace(awards_box_close, awards_box_close.replace('</div>\n                </div>', '</div>\n                </motion.div>'))

# 7. Magazine Covers Train Ticker (Archive section header)
archive_header = r'''    {/* Magazine Covers Train Ticker Section */}
    <section className="bg-slate-950 py-16 overflow-hidden border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
            <div className="flex justify-center mb-6">'''
archive_header_rep = r'''    {/* Magazine Covers Train Ticker Section */}
    <section className="bg-slate-950 py-16 overflow-hidden border-b border-slate-900">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto px-6 mb-10 text-center">
            <div className="flex justify-center mb-6">'''
content = content.replace(archive_header, archive_header_rep)

content = content.replace(
'''            <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-3xl mx-auto leading-relaxed">
                These editions represent our foundational years in print publishing. As we evolve and scale into digital-first global advocacy campaigns and academic forums, our physical magazine print operations are currently paused. We preserve this archive as a testament to our editorial origins.
            </p>
        </div>''',
'''            <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-3xl mx-auto leading-relaxed">
                These editions represent our foundational years in print publishing. As we evolve and scale into digital-first global advocacy campaigns and academic forums, our physical magazine print operations are currently paused. We preserve this archive as a testament to our editorial origins.
            </p>
        </motion.div>'''
)


with open('src/app/home-client.tsx', 'w') as f:
    f.write(content)
