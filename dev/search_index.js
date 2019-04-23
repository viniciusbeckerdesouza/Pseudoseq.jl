var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#Pseudoseq-1",
    "page": "Home",
    "title": "Pseudoseq",
    "category": "section",
    "text": "Fake genomes, fake sequencing, real insights.(Image: Latest Release) (Image: MIT license) (Image: Stable) (Image: Latest) (Image: Pkg Status)"
},

{
    "location": "#Description-1",
    "page": "Home",
    "title": "Description",
    "category": "section",
    "text": "The Pseudoseq package allows you to build arbitrary genomes, and simulate DNA sequencing experiments. DNA sequencing experiments are modelled conceptually as a sampling process."
},

{
    "location": "#Install-1",
    "page": "Home",
    "title": "Install",
    "category": "section",
    "text": "You can install Pseudoseq from the julia REPL:using Pkg\nadd(\"https://github.com/bioinfologics/Pseudoseq.jl.git\")"
},

{
    "location": "#Testing-1",
    "page": "Home",
    "title": "Testing",
    "category": "section",
    "text": "Pseudoseq is tested against Julia 1.X on Linux, OS X, and Windows."
},

{
    "location": "build-a-genome/#",
    "page": "Core concepts & workflow",
    "title": "Core concepts & workflow",
    "category": "page",
    "text": ""
},

{
    "location": "build-a-genome/#Build-a-Genome:-*Core-concepts-and-basic-workflow*-1",
    "page": "Core concepts & workflow",
    "title": "Build-a-Genome: Core concepts & basic workflow",
    "category": "section",
    "text": "Pseudoseq allows you to plan and build genomes and chromosomes that have a certain set of features and peculiarities. The purpose for doing this is not to recreate biology perfectly. The purpose is to create genomes you understand fully (where the repeated content is, which positions are heterozygous and so on).Using such genomes can help you both understand and develop an intuition of what current genome assembly tools are doing, and also to help design assembly tools, and perhaps even plan sequencing experiments and form hypotheses.This manual includes several examples showing how to genomes with certain characteristics. But the core workflow, and important concepts are explained below."
},

{
    "location": "build-a-genome/#.-Creating-chromosome-blueprints-1",
    "page": "Core concepts & workflow",
    "title": "1. Creating chromosome blueprints",
    "category": "section",
    "text": "Chromosome blueprints are the backbone of simulating genomes with Pseudoseq. Chromosome blueprints determine what the nature of one chromosome in a genome. Depending on the genome, any given chromosome may be present in multiple copies. Diploids for example have two copies of every chromosome.The first step in simulating any artificial genome is to create one or more blank chromosome blueprints. The plan_chrom function is used for this.For example, this:using Pseudoseq\nc = plan_chrom(100, 2)will create a blank blueprint for 2 copies of a chromosome of 100bp length."
},

{
    "location": "build-a-genome/#.-Adding-planned-features-to-a-chromosome-blueprint-1",
    "page": "Core concepts & workflow",
    "title": "2. Adding planned features to a chromosome blueprint",
    "category": "section",
    "text": "Once you have one or more chromosome blueprints, you can add features to them.Currently the supported features, and the functions that add to a blueprint include:Repetitions: plan_repetition\nHeterozygosity: plan_hetnote: Note\nEvery time one of these plan_* functions is used to add a feature to a chromosome blueprint, a new chromosome blueprint is created.note: Note\nIf a region of a chromosome is used to plan some feature. E.g. position 5 is used to create some heterozygosity, that same position cannot be used for a second feature, it is consumed and cannot be used again.For example, below will make it so as about 50% of the two chromosome copies  are heterozygous:chet = plan_het(c, 50, 2)There is a utility function suggest_regions available to help plan features. Say you wanted to see where you could place 3 5bp repetitions, you could do the following:r = suggest_regions(chet, 5, 3)"
},

{
    "location": "build-a-genome/#.-Fabricate-a-FASTA-from-chromosome-blueprints-1",
    "page": "Core concepts & workflow",
    "title": "3. Fabricate a FASTA from chromosome blueprints",
    "category": "section",
    "text": "Once you have a set of chromosome blueprints with the features planned that you desire, you can fabricate a FASTA file containing the sequences of these chromosomes. To do that, use the fabricate method that accepts a filename, and a variable number of chromosome blueprints...fabricate(\"mychrom.fasta\", chet)"
},

{
    "location": "sequencing/#",
    "page": "Core concepts & workflow",
    "title": "Core concepts & workflow",
    "category": "page",
    "text": ""
},

{
    "location": "sequencing/#Sequencing:-*Core-concepts-and-basic-workflow*-1",
    "page": "Core concepts & workflow",
    "title": "Sequencing: Core concepts & basic workflow",
    "category": "section",
    "text": "Pseudoseq abstracts DNA sequencing experiments as sampling processes, because this is what they are from a statistical point of view. Just as a quadrat placed at random on the forest floor provides a small sample of it\'s species composition, so it is that a sequencing read provides a small sample of the composition of the motifs present in a genome.This manual includes several examples showing how to emulate various sequencing experiments using different technologies. But the core workflow, and important concepts are explained below.tip: Tip\nThe user can use Pseudoseq\'s API to script each stage of the flow outlined below themselves, or they can use the sequence function, which is the highest-level user facing function. Every example in this section of the manual, will show you how to use both options to achieve the same goal.Anyway, the core sequencing workflow in Pseudoseq is as follows..."
},

{
    "location": "sequencing/#.-Create-a-pool-of-DNA-molecules-1",
    "page": "Core concepts & workflow",
    "title": "1. Create a pool of DNA molecules",
    "category": "section",
    "text": "In reality, all DNA sequencing experiments begin with a sample of tissue or cells. DNA is extracted from the sample in the laboratory, after the genomes of the cells exist as number of DNA molecules, suspended in a solution.In Pseudoseq, such a collection of DNA molecules is called the molecule pool, it is created with the makepool function.In the beginning of a Psueodseq simulation script you create a pool that is the totality of all copies of the genome that exist in your simulation.tip: Tip\nYou can think of the pool at this stage as containing many copies of the same genome sequence:   1. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n   2. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n   3. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n                                ...\n4999. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n5000. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC"
},

{
    "location": "sequencing/#.-Process-the-DNA-molecule-pool-1",
    "page": "Core concepts & workflow",
    "title": "2. Process the DNA molecule pool",
    "category": "section",
    "text": "You then subject your starting DNA molecule pool to a series of transformations, until the pool has the properties you want to emulate.Here we will describe the different transformations you can apply to a DNA molecule pool:"
},

{
    "location": "sequencing/#Fragmenting-the-pool-1",
    "page": "Core concepts & workflow",
    "title": "Fragmenting the pool",
    "category": "section",
    "text": "In an ideal world, if DNA sequencing machines could start at one end of a molecule and read the sequence all the way to the end with reasonable accuracy and throughput, you could simulate that by selecting molecules from your pool, and producing a read file. Give or take some inevitable errors (all detection equipment has a rate of error), assembling a genome would be simple.Sadly, we don\'t have such an amazing sequencer technology that allows the reading of a chromosome in its entirety. Instead, shorter reads are taken of short fragments of DNA. Even long read technology uses fragments and produces reads, much shorter than the full size of a chromosome molecule.A common step in any DNA sequencing experiment, therefore, is to fragment or shear the DNA molecules that are present in the pool.This is achieved in Pseudoseq with the fragment function.tip: Tip\nYou can visualise this process like so:From:   1. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n   2. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n   3. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n                                ...\n4999. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGC\n5000. CGGACTTGAATAGCCCAAAGGTTTCGACACGATCACGACACATAAATTGGCGGACTTGAATAGCTo:   1. CGGACTT GAATAGC CCAAA GGTTTCGACACGA TCACGAC ACATAAAT TGGCGGAC TTGAATAGC\n   2. CGGA CTTGAAT AGCCCAAAG GTTTCGAC ACGATCACGACACAT AAATTGGCGGA CTTGA ATAGC\n   3. CGGACTTGA ATAGCC CAAAGGT TTCGACACGAT CACGACACA TAAATT GGCGGACTT GAATAGC\n                                ...\n4999. CGGAC TTGAATA GCCCAAAGGTTT CGACACGA TCACGACACAT AAATTG GCGGACTTG AATAGC\n5000. CGGACTTGAA TAGCCCA AAGGTTTCGA CACGATCAC GACACA TAAATTGGCGG ACTTGAAT AGC"
},

{
    "location": "sequencing/#Subsampling-molecules-from-a-pool-1",
    "page": "Core concepts & workflow",
    "title": "Subsampling molecules from a pool",
    "category": "section",
    "text": "DNA sequencing experiments are sampling processes, not every one of the  DNA molecules in a pool will be read by the sequencer.Randomly subsampling (without replacement) DNA molecules of a pool is achieved in Pseudoseq with the subsample function."
},

{
    "location": "sequencing/#Determining-the-number-of-molecules-to-subsample-1",
    "page": "Core concepts & workflow",
    "title": "Determining the number of molecules to subsample",
    "category": "section",
    "text": "You can estimate how often a base position in the genome is represented in a DNA molecule pool using the following formula.C = fracLNGWhere C is the expected coverage, L is the average length of the fragments, and N is the number of fragments, and G is the number of bases in the genome.If you wanted to subsample a pool such that each base position in a genome is represented ~50 times (i.e. to achieve 50x coverage), you can determine the number of fragments to subsample from the universe, by reversing the formula:N = fracCGLFor example, if you wanted to sequence 250bp paired-end reads, at 50x coverage, with a genome size of 4639675bp:frac50 times 4639675250 = 927935Remembering that you get two reads from one DNA molecule with paired-end sequencing, you know to subsample 927935  2 = 463967 DNA molecules from a pool.tip: Tip\nPseudoseq provides a helper function that assists in this type of calculation:genome_size = 4639675\nexpected_coverage = 50\nread_length = 250\n\nN = needed_sample_size(expected_coverage, genome_size, readlength)\n\n# Divide by 2 as we\'re doing paired end sequencing.\ndiv(N, 2)"
},

{
    "location": "sequencing/#Tagging-molecules-in-a-pool-1",
    "page": "Core concepts & workflow",
    "title": "Tagging molecules in a pool",
    "category": "section",
    "text": "Some DNA sequencing technologies work by allowing short reads to contain longer range information by tagging molecules in a pool. The basic idea being that if two short reads come from the same large DNA molecule, they will have the same tag.If a DNA fragment in a universe is tagged, and then it is subsequently fragmented during a fragment transform, then all the smaller fragments derived from that long fragment will inherit that long fragment\'s tag. This allows shorter fragments to possess longer range information in the form of these tags, and this is the basis of 10x sequencing and similar technologies.Pseudoseq lets you attach tags to molecules in a pool using the tag function."
},

{
    "location": "sequencing/#.-Generating-reads-1",
    "page": "Core concepts & workflow",
    "title": "3. Generating reads",
    "category": "section",
    "text": "Next, you generate a set of reads from your transformed pool.  Pseudoseq allows you to create paired-end sequencing reads, single-end sequencing reads, and linked paired-end sequencing reads.You create a set of reads using the make_reads function.All sequencers have a certain error rate, and so after you\'ve created a set of reads, you can use the mark_errors function to randomly mark a set of bases in your reads that are destined to be errors in the output file.Finally, you use your set of reads to generate either an interleaved FASTQ file, or two FASTQ files (one for R1 reads, and one for R2 reads)."
},

{
    "location": "examples/pe-example/#",
    "page": "Paired end reads",
    "title": "Paired end reads",
    "category": "page",
    "text": "EditURL = \"https://github.com/bioinfologics/Pseudoseq.jl/blob/master/examples/pe-example.jl\""
},

{
    "location": "examples/pe-example/#Example:-paired-end-sequencing-1",
    "page": "Paired end reads",
    "title": "Example: paired-end sequencing",
    "category": "section",
    "text": "This is an example generated from this source file: pe-example.jl You are seeing the online documentation version. The corresponding notebook can be found here: pe-example.ipynb and the script can be found here: pe-example.jlFor the simulation we are going to:Create a pool of 5000 copies of a reference genome.\nFragment the DNA molecules in the pool, to an average length of 700bp.\nSubsample the molecules in the pool to achieve approximatly 50x coverage.\nCreate a set of 250bp paired-end reads.\nApply errors to the paired-end reads at a rate of 0.001 (.1%).\nGenerate an output FASTQ file.using Pseudoseq"
},

{
    "location": "examples/pe-example/#Using-the-[sequence](@ref)-method-1",
    "page": "Paired end reads",
    "title": "Using the sequence method",
    "category": "section",
    "text": "First, let\'s see how we do this with the sequence method. The first two parameters we give to the function will be the input genome we want to sequence, and the destination FASTQ file for output reads. Here we are setting:The number of genome copies in the molecule pool to 5000.\nThe average fragment size to 700bp.\nThe sampling coverage to 50x.\nThe read length to 250bp.\nThe per base read error rate to 0.001.\nThe fact we want paired-ends of fragments to be read (paired) to true.sequence(\"ecoli-ref.fasta\", \"pe-reads.fastq\"; ng = 5000, flen = 700, cov = 50, paired = true, rdlen = 250, err = 0.001)"
},

{
    "location": "examples/pe-example/#Using-the-Pseudoseq-API-1",
    "page": "Paired end reads",
    "title": "Using the Pseudoseq API",
    "category": "section",
    "text": "Here\'s how to achieve the same thing, using the Pseudoseq API. It is nessecery to use the API if you want to do something that is not anticipated by the available functionality of the sequence method: the cost of conveinience is fewer options.Starting with a FASTA formatted file containing the genome we want to sequence, we create a pool with 5000 copies of the genome.pool = makepool(\"ecoli-ref.fasta\", 5000)Next we use the fragment function to make a pool of shorter DNA molecules.cutpool = fragment(pool, 700)We need to determine the number of molecules to sample, and subsample the pool:genome_size = 4639675\nexpected_coverage = 50\nread_length = 250\n\nN = needed_sample_size(expected_coverage, genome_size, read_length)\nN = div(N, 2) # Divide by 2 as we\'re doing paired end sequencing.\n\nsampledpool = subsample(cutpool, N)We now want to create a set of paired-end reads. We want our reads to be 250bp in length.pe_reads = make_reads(PairedEnd, sampledpool, 250)Now we have some reads, we should mark positions in the reads that are destined to be errors in the output FASTQ.pe_w_errs = mark_errors(pe_reads, 0.001)Now we have some paired end reads and have marked some positions as errors, we can generate FASTQ files.generate(\"pe-reads.fastq\", pe_w_errs)#-This page was generated using Literate.jl."
},

{
    "location": "examples/se-example/#",
    "page": "Long single end reads",
    "title": "Long single end reads",
    "category": "page",
    "text": "EditURL = \"https://github.com/bioinfologics/Pseudoseq.jl/blob/master/examples/se-example.jl\""
},

{
    "location": "examples/se-example/#Example:-long,-single-end-reads-1",
    "page": "Long single end reads",
    "title": "Example: long, single end reads",
    "category": "section",
    "text": "This is an example generated from this source file: se-example.jl You are seeing the online documentation version. The corresponding notebook can be found here: se-example.ipynb and the script can be found here: se-example.jlLet\'s see how you might simulate something like an Oxford Nanopore sequencing experiment.For the simulation we are going to:Create a pool of 5000 copies of a reference genome.\nFragment the DNA molecules in the pool, to an average length of 40,000bp.\nSubsample the molecules in the pool to achieve approximatly 30x coverage.\nCreate a set of single-end reads, the enitre length of each molecule.\nApply errors to the reads at a rate of 0.10 (1 error every 10bp).\nGenerate an output FASTQ file.using Pseudoseq"
},

{
    "location": "examples/se-example/#Using-the-[sequence](@ref)-method-1",
    "page": "Long single end reads",
    "title": "Using the sequence method",
    "category": "section",
    "text": "First, let\'s see how we do this with the sequence method. The first two parameters we give to the function will be the input genome we want to sequence, and the destination FASTQ file for output reads. Here we are setting:The number of genome copies in the molecule pool to 5000.\nThe average fragment size to 40000bp.\nThe sampling coverage to 30x.\nThe read length to nothing, which will make the sequencer read the whole length of any DNA fragment.\nThe per base read error rate to 0.1.\nThe fact we want paired-ends of fragments to be read (paired) to false.sequence(\"ecoli-ref.fasta\", \"longreads.fastq\"; ng = 5000, flen = 40000, cov = 30, rdlen = nothing, err = 0.1, paired = false)"
},

{
    "location": "examples/se-example/#Using-the-Pseudoseq-API-1",
    "page": "Long single end reads",
    "title": "Using the Pseudoseq API",
    "category": "section",
    "text": "Here\'s how to achieve the same thing, using the Pseudoseq API. It is nessecery to use the API if you want to do something that is not anticipated by the available functionality of the sequence method: the cost of conveinience is fewer options.Let\'s start with a pool of 5000 copies of a genome contained in a FASTA file:pool = makepool(\"ecoli-ref.fasta\", 5000)Cut the pool of DNA into fragments of an average length of 40,000bpcutpool = fragment(pool, 40000)Now we\'ll estimate the number of fragments we need to sample from the pool to achieve 30x coverage.genome_size = 4639675\nexpected_coverage = 30\nreadlength = 40000\n\nN = needed_sample_size(expected_coverage, genome_size, readlength)\n\nsampledpool = subsample(cutpool, N)By using the make_reads function without specifying a read length, the function will generate reads from the entire length of each molecule in the pool. We do this to emulate what Nanopore sequencing is supposed to do: It takes an entire DNA fragment, feeds it through an electrically charged pore, producing a read for the entire fragment.se_reads = make_reads(SingleEnd, sampledpool)Long read sequencer have much higher error rates than short read sequencers so we use a error rate of 0.1.se_w_errs = mark_errors(se_reads, 0.1)Finally produce the ouput FASTQ file.generate(\"longreads.fastq\", se_w_errs)#-This page was generated using Literate.jl."
},

{
    "location": "examples/tg-example/#",
    "page": "Tagged paired end reads",
    "title": "Tagged paired end reads",
    "category": "page",
    "text": "EditURL = \"https://github.com/bioinfologics/Pseudoseq.jl/blob/master/examples/tg-example.jl\""
},

{
    "location": "examples/tg-example/#Example:-tagged-paired-end-reads-1",
    "page": "Tagged paired end reads",
    "title": "Example: tagged paired-end reads",
    "category": "section",
    "text": "This is an example generated from this source file: tg-example.jl You are seeing the online documentation version. The corresponding notebook can be found here: tg-example.ipynb and the script can be found here: tg-example.jlLet\'s see how we might simulate something like an 10x sequencing experiment.For this simulation script we will:Create a pool of 5000 copies of a reference genome.\nFragment the DNA molecules in the pool, to an average length of 40,000bp.\nTag the long molecules in the pool randomly with a set of 1,000,000 tags.\nFragment the molecules in the pool to an average length of 700bp.\nSubsample the molecules in the pool to achieve approximatly 50x coverage.\nCreate a set of 250bp paired-end reads.\nApply errors to the paired-end reads at a rate of 0.001 (.1%).\nGenerate an output FASTQ file.using Pseudoseq"
},

{
    "location": "examples/tg-example/#Using-the-[sequence](@ref)-method-1",
    "page": "Tagged paired end reads",
    "title": "Using the sequence method",
    "category": "section",
    "text": "First, let\'s see how we do this with the sequence method. The first two parameters we give to the function will be the input genome we want to sequence, and the destination FASTQ file for output reads. Here we are setting:The number of genome copies in the molecule pool to 5,000.\nThe number of possible tags to one million.\nThe average fragment size, prior to tagging, to 40,000bp.\nThe average fragment size after tagging, to 700bp.\nThe sampling coverage to 50x.\nThe read length to 250bp.\nThe per base read error rate to 0.001.\nThe fact we want paired-ends of fragments to be read (paired) to true, which is the default.sequence(\"ecoli-ref.fasta\", \"tagged_reads.fastq\"; ng = 5000, tusize = 1000000, taggedflen = 40000, flen = 700, cov = 50, rdlen = 250, err = 0.1)"
},

{
    "location": "examples/tg-example/#Using-the-Pseudoseq-API-1",
    "page": "Tagged paired end reads",
    "title": "Using the Pseudoseq API",
    "category": "section",
    "text": "Here\'s how to achieve the same thing, using the Pseudoseq API. It is nessecery to use the API if you want to do something that is not anticipated by the available functionality of the sequence method: the cost of conveinience is fewer options.Let\'s start with a pool of 5000 copies of a genome contained in a FASTA file:dnapool = makepool(\"ecoli-ref.fasta\", 5000)Now let\'s cut up the molecules to an average length of 40,000bpcutpool = fragment(dnapool, 40000)Ok, now we will tag these large fragments randomly. Once you tag a fragment in a universe, any other fragments that are derived from that tagged fragment will inherit the same tag.taggedpool = tag(cutpool, 1000000)Here I\'m going to use a pool of 1,000,000 distinct tags. Which fragment gets a certain tag is random. The size of the tag pool, and the number of fragments in your universe will determine how likely it is that any two fragments get the same tag. Now we\'ll fragment the pool againtaggedcutpool = fragment(taggedpool, 700)Subsample the pool of tagged molecules.genome_size = 4639675\nexpected_coverage = 50\nread_length = 250\n\nN = needed_sample_size(expected_coverage, genome_size, read_length)\nN = div(N, 2) # Divide by 2 as we\'re doing paired end sequencing.\n\nsampledpool = subsample(taggedcutpool, N)Now let\'s make some 250bp tagged paired reads and generate some erroneous positions.tagged_reads = make_reads(TaggedPairs, sampledpool, 250)\ntagged_w_errs = mark_errors(tagged_reads, 0.001)Output to FASTQ:generate(\"tagged_reads.fastq\", tagged_w_errs)#-This page was generated using Literate.jl."
},

{
    "location": "api/sequence/#",
    "page": "Sequencing",
    "title": "Sequencing",
    "category": "page",
    "text": ""
},

{
    "location": "api/sequence/#API:-sequence-1",
    "page": "Sequencing",
    "title": "API: sequence",
    "category": "section",
    "text": ""
},

{
    "location": "api/sequence/#Pseudoseq.sequence",
    "page": "Sequencing",
    "title": "Pseudoseq.sequence",
    "category": "function",
    "text": "sequence(input, output = nothing; kwargs...)\n\nRun a sequencing experiment from start to finish.\n\nThis method is the highest-level function for running sequencing simulations with Pseudoseq. It runs the Pseudoseq sequencin worksflow described in the manual, tuned by the following keyword parameters:\n\nGlobal parameters:\n\ninput: A filename or FASTA.Reader providing the input genome.\noutput: A filename or FASTA.Writer providing a destination for the output reads.\n\nParameters for workflow step 1 (Create a pool of DNA molecules):\n\nng: Integer; the number of genomes the molecule pool is initialized with.\n\nParameters for step 2 (Processing the DNA molecule pool):\n\ntusize: Integer; the number of possible tags a DNA molecule may be tagged with (default: 0).\ntaggedflen: Integer; the desired average fragment length at which molecules are tagged (default: 0bp). \nflen: Integer; the desired average fragment length at which molecules are sampled (default: 700bp).\ncov: Integer; the desired expected coverage (default: 30x coverage).\n\nParameters for step 3 (Generating reads):\n\npaired: true or false; Whether or not to sequence from both end of each molecule (default: true).\nrdlen: Integer; the desired read length (default: 250bp).\nerr: Float; the desired per-base error rate (default: 0.001).\n\n\n\n\n\n"
},

{
    "location": "api/sequence/#Exported-functions-1",
    "page": "Sequencing",
    "title": "Exported functions",
    "category": "section",
    "text": "sequence"
},

{
    "location": "api/pool/#",
    "page": "Molecule Pool",
    "title": "Molecule Pool",
    "category": "page",
    "text": ""
},

{
    "location": "api/pool/#API:-MoleculePool-1",
    "page": "Molecule Pool",
    "title": "API: MoleculePool",
    "category": "section",
    "text": ""
},

{
    "location": "api/pool/#Exported-functions-1",
    "page": "Molecule Pool",
    "title": "Exported functions",
    "category": "section",
    "text": ""
},

{
    "location": "api/pool/#Pseudoseq.makepool",
    "page": "Molecule Pool",
    "title": "Pseudoseq.makepool",
    "category": "function",
    "text": "makepool(gen::Vector{BioSequence{DNAAlphabet{2}}}, ng::Int = 1, iscircular::Bool = false)\n\nCreate a pool of ng copies of a genome defined by the gen vector of sequences.\n\nnote: Note\nThe argument iscircular is currently not used.\n\n\n\n\n\nmakepool(rdr::FASTA.Reader, ng::Int = 1, iscircular::Bool = false)\n\nCreate a pool of ng copies of the genome read in from the FASTA.Reader.\n\nnote: Note\nThe argument iscircular is currently not used.\n\n\n\n\n\nmakepool(file::String, ng::Int, iscircular::Bool = false)\n\nCreate a pool of ng copies of the genome in the fasta formatted file.\n\nnote: Note\nThe argument iscircular is currently not used.\n\n\n\n\n\n"
},

{
    "location": "api/pool/#Making-a-pool-of-molecules-1",
    "page": "Molecule Pool",
    "title": "Making a pool of molecules",
    "category": "section",
    "text": "makepool"
},

{
    "location": "api/pool/#Molecule-pool-transformations-1",
    "page": "Molecule Pool",
    "title": "Molecule pool transformations",
    "category": "section",
    "text": ""
},

{
    "location": "api/pool/#Pseudoseq.fragment-Tuple{Pseudoseq.MoleculePool,Int64}",
    "page": "Molecule Pool",
    "title": "Pseudoseq.fragment",
    "category": "method",
    "text": "fragment(p::MoleculePool, meansize::Int)\n\nCreate a new pool by breaking up the DNA fragments in an input pool.\n\nThis method breaks up a DNA molecule in a pool p, such that the average length of the fragments is approximately meansize.\n\nIt fragments a molecule by scattering an appropriate number of breakpoints across the molecule, before cutting the molecule at those breakpoints.\n\nnote: Note\nBreakpoints are scattered entirely at random across a molecule. No two or more breakpoints can fall in exactly the same place, as those positions are sampled without replacement.\n\nnote: Note\nThe appropriate number of breakpoints to scatter across a molecule is calculated as:fracLS - 1Where L is the length of the molecule being fragmented, and S is the desired expected fragment size. This calculation assumes breakpoints fall randomly across the molecule (see above note).\n\nnote: Note\nIf a DNA molecule being fragmented is smaller than the desired meansize, then it will not be broken, it will simply be included in the new pool.\n\n\n\n\n\n"
},

{
    "location": "api/pool/#Fragment-1",
    "page": "Molecule Pool",
    "title": "Fragment",
    "category": "section",
    "text": "fragment(p::Pseudoseq.MoleculePool, meansize::Int)"
},

{
    "location": "api/pool/#Pseudoseq.subsample-Tuple{Pseudoseq.MoleculePool,Int64}",
    "page": "Molecule Pool",
    "title": "Pseudoseq.subsample",
    "category": "method",
    "text": "subsample(p::MoleculePool, n::Int)\n\nCreate a new pool by sampling an input pool.\n\nnote: Note\nDNA molecules in the input pool p are selected according to the uniform distribution; no one molecule is more or less likely to be selected than another.\n\nnote: Note\nSampling is done without replacement, so it is impossible for the new pool that is created to recieve one molecule the input pool twice.\n\n\n\n\n\n"
},

{
    "location": "api/pool/#Subsampling-1",
    "page": "Molecule Pool",
    "title": "Subsampling",
    "category": "section",
    "text": "subsample(p::Pseudoseq.MoleculePool, n::Int)"
},

{
    "location": "api/pool/#Pseudoseq.tag-Tuple{Pseudoseq.MoleculePool,Int64}",
    "page": "Molecule Pool",
    "title": "Pseudoseq.tag",
    "category": "method",
    "text": "tag(u::MoleculePool, ntags::Int)\n\nCreate a pool of tagged DNA molecules from some input pool.\n\nThe new tagged pool has the same DNA molecules as the input pool. However, each DNA molecule in the new tagged pool will be assigned a tag in the range of 1:ntags.\n\nFor any tagged molecules in a pool, any other molecules that are derived from that tagged molecule will inherit the same tag. For example, if a DNA fragment in a pool is tagged, and then it is subsequently fragmented during a fragment transform, then all the smaller fragments derived from that long fragment will inherit that long fragment\'s tag.\n\nnote: Note\nWhich fragment gets a certain tag is completely random. It is possible for two distinct DNA molecules in a pool to be assigned the same tag. The likelihood of that happening depends on the size of the tag pool (ntags), and the number of fragments in the pool.\n\n\n\n\n\n"
},

{
    "location": "api/pool/#Tagging-1",
    "page": "Molecule Pool",
    "title": "Tagging",
    "category": "section",
    "text": "tag(p::Pseudoseq.MoleculePool, ntags::Int)"
},

{
    "location": "api/reads/#",
    "page": "Reads",
    "title": "Reads",
    "category": "page",
    "text": ""
},

{
    "location": "api/reads/#API:-Reads-1",
    "page": "Reads",
    "title": "API: Reads",
    "category": "section",
    "text": ""
},

{
    "location": "api/reads/#Exported-functions-1",
    "page": "Reads",
    "title": "Exported functions",
    "category": "section",
    "text": ""
},

{
    "location": "api/reads/#Pseudoseq.make_reads",
    "page": "Reads",
    "title": "Pseudoseq.make_reads",
    "category": "function",
    "text": "make_reads(::Type{PairedEnd}, p::MoleculePool, flen::Int, rlen::Int = flen)\n\nCreate a set of paired-end reads from a pool of DNA molecules p.\n\nflen sets the length of forward read, and rlen sets the length of the reverse read. If you only provide flen, then the function sets rlen = flen.\n\nnote: Note\nIf a molecule in the pool is not long enough to create a forward and/or reverse read, then that molecule will simply be skipped. \n\n\n\n\n\nmake_reads(::Type{SingleEnd}, p::MoleculePool, len::Int)\n\nCreate a set of single-end reads from a pool of DNA molecules p.\n\nlen sets the length of the reads.\n\nThe end (strand) from which the reading begins for each DNA molecule in the pool is determined at random for each molecule, with 50:50 probability.\n\nIf you don\'t provide a value for len, then the function will read each DNA molecule in it\'s entirety.\n\nnote: Note\nIf a molecule in the pool is not long enough to create a forward and/or reverse read, then that molecule will simply be skipped. \n\n\n\n\n\nmake_reads(::Type{TaggedPairs}, p::MoleculePool, flen::Int, rlen::Int = flen)\n\nCreate a set of tagged paired-end reads from a pool of DNA molecules p.\n\nflen sets the length of forward read, and rlen sets the length of the reverse read. If you only provide flen, then the function sets rlen = flen.\n\nWhen a set of TaggedPairs is written to file, the tag information is contained in the R1 read of each read-pair. The first 16bp of each R1 read is a sequence that is the tag, and a following 7bp are a buffer between the 16bp tag, and the rest of the read sequence.\n\nnote: Note\nIf a molecule in the pool is not long enough to create a forward and/or reverse read, then that molecule will simply be skipped. \n\n\n\n\n\n"
},

{
    "location": "api/reads/#Making-reads-1",
    "page": "Reads",
    "title": "Making reads",
    "category": "section",
    "text": "make_reads"
},

{
    "location": "api/reads/#Pseudoseq.mark_errors",
    "page": "Reads",
    "title": "Pseudoseq.mark_errors",
    "category": "function",
    "text": "mark_errors(reads::Reads, rate::Float64)\n\nCreate a new set of reads, with errors, from an input set of reads.\n\nWhen you first create a set of reads using a make_reads method, all the reads in that set are perfect reads. In real sequencing experiments, sequencers make errors when reading a DNA molecule, and are characterised by an error rate. This function lets you simulate this characteristic of sequencers, by marking (at random) positions in the reads that are destined to be errors in the output FASTQ.\n\nnote: Note\nCurrently, every position in every read is equally likely to be marked as an error.\n\nnote: Note\nThe number of errors introduced into the reads can be calculated.E = NRWhere E is the number of errors, N is the total number of bases in your set of reads, and R is the error rate you provide to this function.\n\n\n\n\n\n"
},

{
    "location": "api/reads/#Introducing-errors-1",
    "page": "Reads",
    "title": "Introducing errors",
    "category": "section",
    "text": "mark_errors"
},

{
    "location": "api/reads/#Pseudoseq.generate",
    "page": "Reads",
    "title": "Pseudoseq.generate",
    "category": "function",
    "text": "generate(filename::String, reads::Reads)\n\nWrite the reads out to a FASTQ formatted file with the given filename.\n\nIf this method is used with a paired-end read type, then the FASTQ file will be interleaved; all R1 reads will be odd records, and all R2 reads will be even records in the file.\n\nnote: Note\nReads are named according to the sequence in the input genome they came from. e.g. @Reference_1_R1 means the first sequence in the genome, and @Reference_2_R1 means the second sequence in the genome.\n\n\n\n\n\ngenerate(R1name::String, R2name::String, reads::Reads{<:PairedReads})\n\nThis method only works for paired reads. Instead of interleaving R1 and R2 reads in a single FASTQ file, R1 and R2 reads are partitioned into two seperate FASTQ files.\n\n\n\n\n\n"
},

{
    "location": "api/reads/#Generating-FASTQ-files-1",
    "page": "Reads",
    "title": "Generating FASTQ files",
    "category": "section",
    "text": "generate"
},

{
    "location": "api/chromosome-blueprint/#",
    "page": "Chromosome Blueprint",
    "title": "Chromosome Blueprint",
    "category": "page",
    "text": ""
},

{
    "location": "api/chromosome-blueprint/#API:-Build-a-Genome-1",
    "page": "Chromosome Blueprint",
    "title": "API: Build-a-Genome",
    "category": "section",
    "text": ""
},

{
    "location": "api/chromosome-blueprint/#Exported-functions-1",
    "page": "Chromosome Blueprint",
    "title": "Exported functions",
    "category": "section",
    "text": ""
},

{
    "location": "api/chromosome-blueprint/#Pseudoseq.plan_chrom",
    "page": "Chromosome Blueprint",
    "title": "Pseudoseq.plan_chrom",
    "category": "function",
    "text": "Create an empty blueprint for n copies of a chromosome of len base pairs.\n\n\n\n\n\n"
},

{
    "location": "api/chromosome-blueprint/#Making-an-empty-chromosome-blueprint-1",
    "page": "Chromosome Blueprint",
    "title": "Making an empty chromosome blueprint",
    "category": "section",
    "text": "plan_chrom"
},

{
    "location": "api/chromosome-blueprint/#Pseudoseq.plan_repetition",
    "page": "Chromosome Blueprint",
    "title": "Pseudoseq.plan_repetition",
    "category": "function",
    "text": "plan_repetition(cb::ChromosomeBlueprint, from::UnitRange{Int}, to::UnitRange{Int})\n\nPlan a repetition in a chromosome, where the bases in the from region of the chromosome, are guaranteed to occur again in the to region of the chromosome.\n\nEvery copy of the chromosome will have this same repetition.\n\nCreates a new chromosome blueprint, based on the input blueprint cb.\n\nnote: Note\nIn the new blueprint, the from and to regions of the planned chromosome will be consumed, and cannot be used to plan any other subsequently added features.\n\n\n\n\n\nplan_repetition(cb::ChromosomeBlueprint, from::Int, to::Int, size::Int)\n\nPlan a repetition in a chromosome, where the bases in the from:(from + size - 1) region of the chromosome, are guaranteed to occur again in the to:(to + size - 1) region of the chromosome.\n\nEvery copy of the chromosome will have this same repetition.\n\nCreates a new chromosome blueprint, based on the input blueprint cb.\n\n\n\n\n\nplan_repetition(cb::ChromosomeBlueprint, intervals::Vector{UnitRange{Int}})\n\nA conveinience method of plan_repetition. Designed to ease the process of planing a series of repetitions in a chromosome.\n\nEvery copy of the chromosome will have these same repetitions.\n\nCreates a new chromosome blueprint, based on the input blueprint cb.\n\ntip: Tip\nUse the suggest_regions function to help decide on a set of sites to make heterozygous.\n\nnote: Note\nThe number of intervals provided must be an even number. This is because intervals 1 & 2  define the first repeat, intervals 3 & 4 define the second, and so on.\n\nnote: Note\nIn the new blueprint, the regions that were use to plan the repetitions, have been consumed, and cannot be used to plan any other subsequently added features.\n\n\n\n\n\n"
},

{
    "location": "api/chromosome-blueprint/#Planning-motif-repetitions-along-chromosomes-1",
    "page": "Chromosome Blueprint",
    "title": "Planning motif repetitions along chromosomes",
    "category": "section",
    "text": "plan_repetition"
},

{
    "location": "api/chromosome-blueprint/#Pseudoseq.plan_het",
    "page": "Chromosome Blueprint",
    "title": "Pseudoseq.plan_het",
    "category": "function",
    "text": "plan_het(cb::ChromosomeBlueprint, pos::Int, alleles::Vector{DNA})\n\nPlan heterozygosity between copies of a chromosome at position pos.\n\nThe alleles vector must contain a nucleotide for each copy of the chromosome.\n\nFor example if you provided a vector of [DNA_A, DNA_C], for the heterozygous site you\'re defining at pos, the first copy of the chromosome will have an A, and the second copy of the chromosome will have a C.\n\nCreates a new chromosome blueprint, based on the input blueprint cb.\n\ntip: Tip\nUse the suggest_alleles function to help decide on a set of alleles to use.\n\nnote: Note\nIn the new blueprint, the positions that were used to plan the heterozygosity, have been consumed, and cannot be used to plan any other subsequently added features.\n\n\n\n\n\nplan_het(cb::ChromosomeBlueprint, pos, alleles::Vector{Vector{DNA}})\n\nA conveinience method of plan_het. Plans heterozygosity between copies of a chromosome at the many positions defined by pos.\n\nThe alleles vector must contain a vector for every position in pos that  defines the base each copy of the chromosome has.\n\nCreates a new chromosome blueprint, based on the input blueprint cb.\n\ntip: Tip\nUse the suggest_alleles function to help decide on a set of alleles to use. \n\ntip: Tip\nUse the suggest_regions function to help decide on a set of sites to make heterozygous.\n\nnote: Note\nIn the new blueprint, the positions that were use to plan the heterozygosity, have been consumed, and cannot be used to plan any other subsequently added features.\n\n(See also: plan_repetition)\n\n\n\n\n\n"
},

{
    "location": "api/chromosome-blueprint/#Planning-heterozygosity-between-chromosome-copies-1",
    "page": "Chromosome Blueprint",
    "title": "Planning heterozygosity between chromosome copies",
    "category": "section",
    "text": "plan_het"
},

{
    "location": "api/chromosome-blueprint/#Fabricate-1",
    "page": "Chromosome Blueprint",
    "title": "Fabricate",
    "category": "section",
    "text": "fabricate"
},

{
    "location": "api/chromosome-blueprint/#Pseudoseq.suggest_regions",
    "page": "Chromosome Blueprint",
    "title": "Pseudoseq.suggest_regions",
    "category": "function",
    "text": "suggest_regions(cp::ChromosomeBlueprint, size::Int, n::Int)\n\nA useful utility function to assist planning features in a chromosome blueprint.\n\nThis method returns a vector of non-overlapping, regions of the chromosome planned represented by the ChromosomeBlueprint cb.\n\nThese regions are free regions: they are untouched by any other planned features, and so may be used when planning other features (See also: plan_repetition, plan_het).\n\nThe regions will be sizebp in length.\n\nwarn: Warn\nThis function was designed for use interactively in a julia session.If this method cannot find n free regions of the size you\'ve asked for, it will still give an output vector containing the regions it did manage to find, but it will issue a warning to the terminal. This will get increasingly likely as you fill the chromosome blueprint up with features.If you are using this method in a script or program where you depend on a reliable number of regions, either add a check to make sure you got the number of regions you need, or use this method interactively, and hard code an appropriate output into your script.\n\n\n\n\n\n"
},

{
    "location": "api/chromosome-blueprint/#Utility-functions-1",
    "page": "Chromosome Blueprint",
    "title": "Utility functions",
    "category": "section",
    "text": "suggest_regions"
},

]}
