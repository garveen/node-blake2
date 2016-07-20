{
	"targets": [
		{
			"target_name": "binding",
			"win_delay_load_hook": "true",
			"sources": [
				 "binding.cpp"
				,"BLAKE2/sse/blake2b.c"
				,"BLAKE2/sse/blake2bp.c"
				,"BLAKE2/sse/blake2s.c"
				,"BLAKE2/sse/blake2sp.c"
			],
			"include_dirs": [
				 "<!(node -e \"require('nan')\")"
				,"BLAKE2/sse"
			],
			"cflags_c": [
				 "-std=c11"
				,"-Wstrict-aliasing"
				,"-Wextra"
				,"-Wno-unused-function"
				,"-Wno-unused-const-variable"
			],
			"cflags_cc": [
				 "-std=c++11"
				,"-Wstrict-aliasing"
				,"-Wextra"
				,"-Wno-unused-function"
				# ,"-Wno-unused-const-variable"
				,"-Wno-unused-parameter"
			],
			'xcode_settings': {
				'OTHER_CFLAGS': [
					 "-Wstrict-aliasing"
					,"-Wextra"
					,"-Wno-unused-function"
					,"-Wno-unused-const-variable"
					,"-Wno-unused-parameter"
				]
			},
			"msvs_settings": {
				"VCCLCompilerTool": {
					"AdditionalOptions": ["/arch:AVX"]
				}
			}
		}
	]
}