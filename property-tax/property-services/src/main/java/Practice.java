import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Practice {
    public static void main(String[] args) {
        List<List<String>> skills = Arrays.asList(
                Arrays.asList("java","springboot","postgres"),
                Arrays.asList("javaScript","reactJs","Flutter"),
                Arrays.asList("Docker","kubernetes","kafka")
        );
        System.out.println(skills);

        // merge all the skills into a single list
        List<String> allSkills = skills.stream().flatMap(skillList -> skillList.stream()).collect(Collectors.toList());

//        System.out.println(allSkills);

        // find all the skills that start with s character
        List<String> l = allSkills.stream().filter(skill->skill.startsWith("s")).collect(Collectors.toList());
        System.out.println(l);
        
    }
}
